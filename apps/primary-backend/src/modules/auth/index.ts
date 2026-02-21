import Elysia, { Cookie, status, t } from "elysia";

import { AuthModel } from "./model";
import { AuthService } from "./service";
import jwt from "@elysiajs/jwt";

export const auth = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    }),
  )
  .post(
    "/sign-up",
    async ({ body, status }) => {
      try {
        const userId = await AuthService.signup(body.email, body.password);
        return {
          id: userId,
        };
      } catch (error) {
        return status(400, {
          message: "Error while signing up",
        });
      }
    },
    {
      body: AuthModel.signupBody,
      response: {
        200: AuthModel.signupResponse,
        400: AuthModel.signupInvalid,
      },
    },
  )

  .post(
    "/sign-in",
    async ({ jwt, body, status, cookie: { auth } }) => {
      const { correctCredentials, userId } = await AuthService.signin(
        body.email,
        body.password,
      );
      if (correctCredentials && userId) {
        const token = jwt.sign({ userId });
        if (!auth) {
          auth = new Cookie("auth", {});
        }
        auth.set({
          value: token,
          httpOnly: true,
          maxAge: 7 * 86400,
        });

        return {
          message: "Signin successfully",
        };
      } else {
        return status(403, {
          message: "Invalid username or password",
        });
      }
    },
    {
      body: AuthModel.signInBody,
      response: {
        200: AuthModel.signInResponse,
        403: AuthModel.signInInvalid,
      },
    },
  );
