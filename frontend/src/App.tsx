import { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

const API = "/api";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(`${API}/todos`)
      .then((r) => r.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    const res = await fetch(`${API}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const todo: Todo = await res.json();
    setTodos((prev) => [...prev, todo]);
    setTitle("");
  };

  const toggleDone = async (todo: Todo) => {
    const res = await fetch(`${API}/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !todo.done }),
    });
    const updated: Todo = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTodo = async (id: number) => {
    await fetch(`${API}/todos/${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <h1>TODO</h1>
      <div className="input-row">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="新しいタスクを入力..."
        />
        <button onClick={addTodo}>追加</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? "done" : ""}>
            <span onClick={() => toggleDone(todo)}>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
