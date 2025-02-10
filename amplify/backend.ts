// amplify/backend.ts
import { defineBackend, secret } from '@aws-amplify/backend';
// import { getSecret } from './functions/get-secret/resource';
import { data } from './data/resource';
import { auth } from './auth/resource';

import { sayHello } from './functions/get-secret/resource';

// export const testApiKey = secret('testApiKey');

defineBackend({
  sayHello,
  auth,
  data
});
