// import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

// const schema = a.schema({
//   Todo: a
//     .model({
//       content: a.string(),
//     })
//     .authorization((allow) => [allow.publicApiKey()]),
// });

// export type Schema = ClientSchema<typeof schema>;

// export const data = defineData({
//   schema,
//   authorizationModes: {
//     defaultAuthorizationMode: "apiKey",
//     // API Key is used for a.allow.public() rules
//     apiKeyAuthorizationMode: {
//       expiresInDays: 30,
//     },
//   },
// });


import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
    
  // Add secrets query to the schema
  Secrets: a
    .query()
    .authorization((allow) => [allow.publicApiKey()])
    .returns(
      a.object({
        testApiKey: a.string(),
        // Add more secrets as needed
      })
    ),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
  // Add the handler for secrets
  handlers: {
    getSecrets: async () => {
      return {
        testApiKey: secret('TEST_API_KEY'),
        // Add more secrets as needed
      };
    }
  }
});
