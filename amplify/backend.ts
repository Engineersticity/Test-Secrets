// amplify/backend.ts
import { defineBackend, secret } from '@aws-amplify/backend';
import { getSecret } from './functions/get-secret/resource';
import { data } from './data/resource';

// Create secret with a name
export const testApiKey = secret('testApiKey');

defineBackend({
  getSecret,
  data
});
