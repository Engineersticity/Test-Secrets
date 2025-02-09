import { defineFunction } from '@aws-amplify/backend';

export const getSecrets = defineFunction({
  name: 'getSecrets',
  entry: './handler.ts'
});