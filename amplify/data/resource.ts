// amplify/data/resource.ts
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { getSecret } from "../functions/get-secret/resource";

const schema = a.schema({
  getSecret: a
    .query()
    .returns(a.string())
    .handler(a.handler.function(getSecret))
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  }
});
