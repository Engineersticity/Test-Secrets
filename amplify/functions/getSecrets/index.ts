import { type AppSyncResolverHandler } from 'aws-lambda';
import { secret } from '@aws-amplify/backend';

export const handler: AppSyncResolverHandler<void, any> = async () => {
  try {
    const secrets = {
      testApiKey: await secret('TEST_API_KEY'),
      // Add more secrets as needed
    };
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ data: secrets })
    };
  } catch (error) {
    console.error('Error fetching secrets:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Failed to fetch secrets',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};