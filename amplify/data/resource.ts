// amplify/data/resource.ts
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { sayHello } from "../functions/get-secret/resource";

const schema = a.schema({
  // getSecret: a
  //   .query()
  //   .returns(a.string())
  //   .handler(a.handler.function(getSecret)),

      
  sayHello: a
  .query()
  .arguments({
    name: a.string(),
  })
  .returns(a.string())
  .handler(a.handler.function(sayHello))
  .authorization(allow => [allow.publicApiKey()])
  ,
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  }
});
