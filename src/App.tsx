// src/App.tsx
import React from 'react';
import { Amplify } from 'aws-amplify';
import SecretFetcher from './components/SecretFetcher';
import config from './amplifyconfiguration.json';

Amplify.configure(config);

function App() {
  return (
    <div className="App">
      <h1>Secret Manager Demo</h1>
      <SecretFetcher />
    </div>
  );
}

export default App;
