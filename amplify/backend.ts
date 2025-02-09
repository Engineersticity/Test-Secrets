import { defineBackend, secret } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

// Define your backend with all configurations
export const backend = defineBackend({
  auth,
  data: {
    ...data,
    // Add a function to get secrets
    handlers: {
      ...data.handlers,
      getSecrets: async () => {
        return {
          testApiKey: secret('TEST_API_KEY'),
          // Add more secrets as needed
        };
      }
    }
  }
});