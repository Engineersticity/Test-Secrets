// src/components/SecretFetcher.tsx
import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

interface SayHelloQueryResponse {
  data: string | null; // Allow for null as well
}

const SecretFetcher: React.FC = () => {
  const [secret, setSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [secretName, setSecretName] = useState<string>(''); // State for the input value
  const [inputError, setInputError] = useState<string>(''); // Error for the input field.

  // Fetch the secret when the component mounts and when secretName changes
  useEffect(() => {
    fetchSecret();
  }, [secretName]);

  const fetchSecret = async () => {
    // Only fetch the secret if a name has been entered.
    if (!secretName) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(''); // Clear previous errors
    try {
      const response = await client.queries.sayHello({
        name: secretName,
      });

      if (response.data) {
        setSecret(response.data as SayHelloQueryResponse['data']); // Directly set response.data
        setError('');
      } else {
        setError('Empty Response from server');
        console.error('Response has no data property');
      }
    } catch (err) {
      setError('Failed to fetch secret');
      console.error('Error fetching secret:', err);
      setSecret(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecretName(event.target.value);
    setInputError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page refresh
    if (secretName === '') {
        setInputError('Please enter a secret name.');
    } else {
        fetchSecret();
    }

  };

  return (
    <div>
      <h2>Secret:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="secretName">Secret Name:</label>
        <input
          type="text"
          id="secretName"
          value={secretName}
          onChange={handleInputChange}
        />
        {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
        <button type="submit">Get Secret</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {secret && <p>{secret}</p>}
    </div>
  );
};

export default SecretFetcher;
