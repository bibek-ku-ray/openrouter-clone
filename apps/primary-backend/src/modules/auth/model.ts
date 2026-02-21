import { t, UnwrapSchema } from "elysia";

export namespace AuthModel {
  // Signin schema
  export const signInBody = t.Object({
    email: t.String(),
    password: t.String(),
  });
  export type signInBody = typeof signInBody.static;

  export const signInResponse = t.Object({
    message: t.Literal("Signin successfully")
  });
  export type signInResponse = typeof signInResponse.static
  
  export const signInInvalid = t.Object({
    message: t.Literal("Invalid username or password")
  })
  export type signInInvalid = typeof signInInvalid.static
  
  export const signInSuccess = t.Object({
    message: t.Literal("Signed in successfully")
  })
  export type signInSuccess = typeof signInSuccess.static


  // Signup schema
  export const signupBody = t.Object({
    email: t.String(),
    password: t.String(),
  });
  export type signupBody = typeof signupBody.static
  
  export const signupResponse = t.Object({
    id: t.String(),
  });
  export type signupResponse = typeof signupResponse.static

  export const signupInvalid = t.Object({
    message: t.Literal("Error while signing up")
  })
  export type signupInvalid = typeof signupInvalid.static
}
