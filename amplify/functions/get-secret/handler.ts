import { secret } from '@aws-amplify/backend';
import { AppSyncResolverEvent } from 'aws-lambda';

type ResolverEvent = AppSyncResolverEvent<{ name?: string | undefined }, any>;

// Store the secret outside the handler function
const apiKeySecret = secret('testApiKey');

export const handler = async (event: ResolverEvent) => {
  // arguments typed from `.arguments()`
  const { name } = event.arguments;
  // return typed from `.returns()`

  if (name === "apiKey") {
    try {
      // Fetch the secret's value
      return apiKeySecret;
    } catch (error) {
      console.error('Error fetching API key:', error);
      // Return an error message or null
      return "Error: could not fetch secret";
    }
  }
  return `Hello, ${name}!`;
};
