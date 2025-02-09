// src/components/SecretFetcher.tsx
import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

const SecretFetcher: React.FC = () => {
  const [secret, setSecret] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchSecret = async () => {
    setLoading(true);
    try {
      const response = await client.queries.getSecret();
      setSecret(response);
      setError('');
    } catch (err) {
      setError('Failed to fetch secret');
      console.error('Error fetching secret:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecret();
  }, []);

  return (
    <div>
      <h2>Secret Value</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {secret && <p>Secret: {secret}</p>}
      <button onClick={fetchSecret} disabled={loading}>
        Refresh Secret
      </button>
    </div>
  );
};

export default SecretFetcher;
