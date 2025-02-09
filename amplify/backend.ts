import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { getSecrets } from './functions/getSecrets/resource';

export const backend = defineBackend({
  auth,
  data,
  getSecrets
});