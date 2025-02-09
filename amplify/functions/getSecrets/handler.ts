import type { Schema } from "../../data/resource";
import { secret } from '@aws-amplify/backend';

export const handler: Schema["getSecrets"]["functionHandler"] = async () => {
  try {
    const secrets = {
      testApiKey: await secret('TEST_API_KEY'),
      // Add more secrets as needed
    };
    
    return JSON.stringify(secrets);
  } catch (error) {
    console.error('Error fetching secrets:', error);
    throw error;
  }
};