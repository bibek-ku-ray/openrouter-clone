import { t } from "elysia";

export namespace ApiKeyModel {
  // create key
  export const createKeySchema = t.Object({
    name: t.String(),
  });
  export type createKeySchema = typeof createKeySchema.static;

  // create key response
  export const createApiKeyResponse = t.Object({
    id: t.String(),
    apiKey: t.String(),
  });
  export type createApiKeyResponse = typeof createApiKeyResponse.static;

  // update api key
  export const updateApiKeySchema = t.Object({
    id: t.String(),
    disabled: t.Boolean(),
  });
  export type updateApiKeySchema = typeof updateApiKeySchema.static;

  export const updateApiKeyResponseSchema = t.Object({
    message: t.Literal("Updated api key successfully"),
  });
  export type updateApiKeyResponseSchema =
    typeof updateApiKeyResponseSchema.static;

  export const disabledApiKeyResponseFailedSchema = t.Object({
    message: t.Literal("Failed to update api key"),
  });
  export type disabledApiKeyResponseFailedSchema =
    typeof disabledApiKeyResponseFailedSchema.static;

  export const getApiKeyResponseSchema = t.Object({
    apiKeys: t.Array(
      t.Object({
        id: t.String(),
        apiKey: t.String(),
        name: t.String(),
        creditConsumed: t.Number(),
        lastUsed: t.Nullable(t.Date()),
        disabled: t.Boolean(),
      }),
    ),
  });
  export type getApiKeyResponseSchema = typeof getApiKeyResponseSchema.static;

  export const deleteApiKeyResponseSchema = t.Object({
    message: t.Literal("Api key deleted successfully"),
  });

  export type deleteApiKeyResponseSchema =
    typeof deleteApiKeyResponseSchema.static;

  export const deleteApiKeyResponseFailedSchema = t.Object({
    message: t.Literal("Failed to delete api key"),
  });

  export type deleteApiKeyResponseFailedSchema =
    typeof deleteApiKeyResponseFailedSchema.static;
}
