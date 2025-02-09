import { secret } from '@aws-amplify/backend';

export const handler = async () => {
  try {
    const secrets = {
      testApiKey: await secret('TEST_API_KEY'),
      // Add more secrets as needed
    };
    
    return {
      statusCode: 200,
      body: JSON.stringify(secrets)
    };
  } catch (error) {
    console.error('Error fetching secrets:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch secrets' })
    };
  }
};