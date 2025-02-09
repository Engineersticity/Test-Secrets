// amplify/functions/get-secret/resource.ts
import { defineFunction } from '@aws-amplify/backend';

export const getSecret = defineFunction({
  name: 'get-secret',
  entry: './handler.ts'
});
