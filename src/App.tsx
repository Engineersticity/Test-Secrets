import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { Amplify } from 'aws-amplify';
import { fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';
import { post } from 'aws-amplify/api';
import type { Schema } from "./amplify/data/resource";

const client = generateClient<Schema>();

type Secrets = {
  testApiKey: string;
  [key: string]: string;
};

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["model"]>>([]);
  const [secrets, setSecrets] = useState<Secrets | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => setTodos([...items]),
      error: (err) => setError(err.message)
    });

    // Fetch secrets using Lambda function
    const fetchSecrets = async () => {
      try {
        const response = await post({
          apiName: 'api',
          path: '/getSecrets'
        });
        
        const secretsData = JSON.parse(response.body);
        setSecrets(secretsData);
        console.log('Secrets loaded successfully');
      } catch (err) {
        console.error('Error fetching secrets:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch secrets');
      }
    };

    fetchSecrets();
    return () => subscription.unsubscribe();
  }, []);

  function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      client.models.Todo.create({ content });
    }
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">My todos</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {secrets && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Secrets loaded successfully!
        </div>
      )}

      <button 
        onClick={createTodo}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        + New Todo
      </button>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="border p-2 rounded">
            {todo.content}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;