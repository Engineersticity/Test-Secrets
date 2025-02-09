// amplify/functions/get-secret/handler.ts
import { type Handler } from 'aws-lambda';
import { testApiKey } from '../../backend';

export const handler: Handler = async () => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        secret: testApiKey.value
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch secret' }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
  }
};
