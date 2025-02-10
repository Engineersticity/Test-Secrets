// amplify/backend.ts
import { defineBackend, secret } from '@aws-amplify/backend';
import { data } from './data/resource';
import { auth } from './auth/resource';

import { sayHello } from './functions/get-secret/resource';

defineBackend({
  sayHello,
  auth,
  data
});
