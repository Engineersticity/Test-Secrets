// import { secret } from '@aws-amplify/backend';
// import { AppSyncResolverEvent } from 'aws-lambda';

// type ResolverEvent = AppSyncResolverEvent<{ name?: string | undefined }, any>;

// // Store the secret outside the handler function
// const apiKeySecret = secret('testApiKey');

// export const handler = async (event: ResolverEvent) => {
//   // arguments typed from `.arguments()`
//   const { name } = event.arguments;
//   // return typed from `.returns()`

//   if (name === "apiKey") {
//     try {
//       // Fetch the secret's value
//       return apiKeySecret;
//     } catch (error) {
//       console.error('Error fetching API key:', error);
//       // Return an error message or null
//       return "Error: could not fetch secret";
//     }
//   }
//   return `Hello, ${name}!`;
// };


// import { secret } from '@aws-amplify/backend';
// import { AppSyncResolverEvent } from 'aws-lambda';

// type ResolverEvent = AppSyncResolverEvent<{ name?: string | undefined }, any>;

// // Store the secret outside the handler function
// const apiKeySecret = secret('testApiKey');

// export const handler = async (event: ResolverEvent) => {
//   // arguments typed from `.arguments()`
//   const { name } = event.arguments;
//   // return typed from `.returns()`

//   if (name === "apiKey") {
//     try {
//       // Fetch the secret's value
//       const apiKey = await apiKeySecret.get() as string;
//       return apiKey;
//     } catch (error) {
//       console.error('Error fetching API key:', error);
//       // Return an error message or null
//       return "Error: could not fetch secret";
//     }
//   }
//   return `Hello, ${name}!`;
// };

// amplify/functions/say-hello/handler.ts
// amplify/functions/get-secret/handler.ts
import { env } from '$amplify/env/get-secret';
import { AppSyncResolverEvent } from 'aws-lambda';

type ResolverEvent = AppSyncResolverEvent<{ name?: string | undefined }, any>;

// Define the type for the valid environment variable names
type SecretEnvNames = 'MY_API_KEY' | 'MY_SECOND_SECRET';

export const handler = async (event: ResolverEvent) => {
  const { name } = event.arguments;

  // Define a map of secret names to environment variables
  const secretMap: { [key: string]: SecretEnvNames } = {
    API_KEY: 'MY_API_KEY',
    SECOND_SECRET: 'MY_SECOND_SECRET', // Map for the second secret
  };

  try {
    if (name && secretMap[name]) {
      // Retrieve the correct secret name from the map
      const secretEnvName: SecretEnvNames = secretMap[name];

      // Access the environment variable containing the secret
      const secretValue = env[secretEnvName];

      // Check if there is a secret at the given key.
      if (!secretValue) {
        throw new Error("secret not found");
      }

      // return the secret value.
      return secretValue;
    }

    // if there is no name parameter or if there is no secret at that name.
    if (name) {
      return `Hello, ${name}!`;
    } else {
      // we use the env here to be consistent with other code. But we are not using a secret, just a normal env.
      return `Hello, ${env.NAME}!`;
    }
  } catch (error) {
    console.error('Error fetching secret:', error);
    return "Error: could not fetch secret";
  }
};



