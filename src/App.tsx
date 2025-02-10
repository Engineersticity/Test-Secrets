// src/App.tsx
import type { Schema } from "./amplify/data/resource"
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/api"
import outputs from "./amplify_outputs.json"

Amplify.configure(outputs)

const client = generateClient<Schema>()

function App() {
  return (
    <div className="App">
      <h1>Secret Manager Demo</h1>
      <SecretFetcher />
    </div>
  );
}

export default App;
