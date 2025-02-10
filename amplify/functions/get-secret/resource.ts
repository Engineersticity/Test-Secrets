
import { defineFunction, secret } from '@aws-amplify/backend';

export const sayHello = defineFunction({
  environment: {
    NAME: "World",
    MY_API_KEY: secret('testApiKey'), // this assumes you created a secret named "MY_API_KEY"
    MY_SECOND_SECRET: secret('MY_SECOND_SECRET'), // Example of a second secret
  }
});
