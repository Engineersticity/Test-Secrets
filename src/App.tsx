// src/App.tsx

import SecretFetcher from './components/SecretFetcher';
import { Amplify } from "aws-amplify"
import outputs from "./amplify_outputs.json"

Amplify.configure(outputs);

function App() {
  return (
    <div className="App">
      <h1>Secret Manager Demo</h1>
      <SecretFetcher />
    </div>
  );
}

export default App;
