// src/components/SecretFetcher.tsx
import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();


interface SayHelloQueryResponse {
  data: string; // Or whatever the actual return type is
}

const SecretFetcher: React.FC = () => {
  const [secret, setSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchSecret();
  }, []);

  const fetchSecret = async () => {
    setLoading(true);
    try {
      const response = await client.queries.sayHello({
        name: "sticity",
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Secret:</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {secret && <p>{secret}</p>}
    </div>
  );
};

export default SecretFetcher;
