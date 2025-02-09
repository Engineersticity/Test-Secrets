import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

// Initialize the Amplify client
const client = generateClient<Schema>();

// Define the Todo type for better type safety
type Todo = Schema["Todo"]["type"];

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Load secrets on mount
    loadSecrets();

    // Set up the subscription to todos
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => setTodos([...items]),
      error: (err) => setError(err.message)
    });

    // Cleanup subscription on component unmount
    return () => subscription.unsubscribe();
  }, []);

  const loadSecrets = async () => {
    try {
      // Use environment variables securely
      if (!import.meta.env.VITE_SECRETS) {
        throw new Error("VITE_SECRETS environment variable is not defined");
      }
      
      const secrets = JSON.parse(import.meta.env.VITE_SECRETS);
      const testApiKey = secrets["testApiKey"];
      
      // Debug logs for testing
      console.log("Full secrets object:", secrets);
      console.log("testApiKey:", testApiKey);
      return testApiKey;
    } catch (err) {
      setError("Failed to load secrets");
      console.error("Error loading secrets:", err);
    }
  };

  const createTodo = async () => {
    const content = window.prompt("Todo content");
    if (!content) return;

    try {
      await client.models.Todo.create({ content });
    } catch (err) {
      setError("Failed to create todo");
      console.error("Error creating todo:", err);
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">My todos</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <button 
        onClick={createTodo}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-2"
      >
        + New Todo
      </button>
      <button 
        onClick={loadSecrets}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Test Load Secrets
      </button>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li 
            key={todo.id}
            className="border p-2 rounded"
          >
            {todo.content}
          </li>
        ))}
      </ul>

      <div className="mt-8 text-gray-600">
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a 
          href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates"
          className="text-blue-500 hover:text-blue-700"
        >
          Review next step of this tutorial
        </a>
      </div>
    </main>
  );
}

export default App;