import { defineFunction } from '@aws-amplify/backend';

export const getSecretsFunction = defineFunction({
  name: 'getSecrets',
  entry: './handler.ts'
});