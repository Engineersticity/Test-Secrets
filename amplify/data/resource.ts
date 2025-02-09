import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { getSecrets } from '../functions/getSecrets/resource';

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
    
  // Update the getSecrets query with the function reference
  getSecrets: a
    .query()
    .authorization((allow) => [allow.publicApiKey()])
    .arguments({})
    .returns(a.string())
    .handler(getSecrets)  // Pass the actual function reference
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  }
});