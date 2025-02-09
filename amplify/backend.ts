import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { getSecretsFunction } from './functions/getSecrets/resource';

export const backend = defineBackend({
  auth,
  data,
  // Export the function directly
  getSecrets: getSecretsFunction
});