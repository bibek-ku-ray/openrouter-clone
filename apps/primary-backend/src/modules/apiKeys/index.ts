import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { ApiKeyService } from "./service";
import { ApiKeyModel } from "./model";

export const app = new Elysia({ prefix: "api-keys" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    }),
  )
  .derive(async ({ cookie: { auth }, set, jwt }) => {
    if (!auth) {
      set.status = 401;
      throw new Error("Unauthorized");
    }

    const decoded = await jwt.verify(auth.value as string);

    if (!decoded || !decoded.userId) {
      set.status = 401;
      throw new Error("Unauthorized");
    }

    return {
      userId: decoded.userId as string,
    };
  })

  .post(
    "/",
    async ({ userId, body }) => {
      const { apiKey, id } = await ApiKeyService.createApiKey(
        body.name,
        userId,
      );
      return {
        id,
        apiKey,
      };
    },
    {
      body: ApiKeyModel.createKeySchema,
      response: {
        200: ApiKeyModel.createApiKeyResponse,
      },
    },
  )
  .get(
    "/",
    async ({ userId }) => {
      const apiKeys = await ApiKeyService.getApiKey(Number(userId));
      return {
        apiKeys,
      };
    },
    {
      response: {
        200: ApiKeyModel.getApiKeyResponseSchema,
      },
    },
  )
  .put(
    "/",
    async ({ body, userId, status }) => {
      try {
        await ApiKeyService.updateApiKeyDisabled(
          Number(body.id),
          Number(userId),
          body.disabled,
        );
        return {
          message: "Updated api key successfully" as const,
        };
      } catch (e) {
        return status(411, {
          message: "Failed to update api key" as const,
        });
      }
    },
    {
      body: ApiKeyModel.updateApiKeySchema,
      response: {
        200: ApiKeyModel.updateApiKeyResponseSchema,
        411: ApiKeyModel.disabledApiKeyResponseFailedSchema,
      },
    },
  )
  .delete(
    "/:id",
    async ({ params: { id }, userId, status }) => {
      try {
        await ApiKeyService.delete(Number(id), Number(userId));
        return {
          message: "Api key deleted successfully" as const,
        };
      } catch (e) {
        return status(411, {
          message: "Failed to delete api key" as const,
        });
      }
    },
    {
      response: {
        200: ApiKeyModel.deleteApiKeyResponseSchema,
        411: ApiKeyModel.deleteApiKeyResponseFailedSchema,
      },
    },
  );
