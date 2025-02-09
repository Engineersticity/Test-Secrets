// amplify/backend.ts
import { defineBackend, secret } from '@aws-amplify/backend';
import { getSecret } from './functions/get-secret/resource';

export const testApiKey = secret();

defineBackend({
  getSecret,
  secrets: {
    testApiKey
  }
});
