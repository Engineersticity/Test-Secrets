import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { post } from 'aws-amplify/api';
import type { Schema, TodoType } from "../amplify/data/resource";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [secretsLoaded, setSecretsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set up todos subscription
    const subscription = client.models.Todo.observeQuery()
      .subscribe({
        next: ({ items }: { items: TodoType[] }) => setTodos([...items]),
        error: (err: Error) => setError(err.message)
      });

    // Fetch secrets using Lambda function
    const fetchSecrets = async () => {
      try {
        const response = await post({
          apiName: 'api',
          path: '/getSecrets'
        });
        
        // Just log the response to verify what we're getting
        console.log('API Response:', response);
        setSecretsLoaded(true);
      } catch (err) {
        console.error('Error fetching secrets:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch secrets');
      }
    };

    fetchSecrets();
    return () => subscription.unsubscribe();
  }, []);

  async function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      try {
        await client.models.Todo.create({
          content,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create todo');
      }
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

      {secretsLoaded && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Secrets API call completed! Check console for response details.
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