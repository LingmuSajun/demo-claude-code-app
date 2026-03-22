import express, { Request, Response } from "express";
import Database from "better-sqlite3";
import path from "path";

const app = express();
app.use(express.json());

const db = new Database(path.join(process.env.DATA_DIR ?? ".", "todos.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done  INTEGER NOT NULL DEFAULT 0
  )
`);

interface TodoRow {
  id: number;
  title: string;
  done: number;
}

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

const toTodo = (row: TodoRow): Todo => ({ ...row, done: row.done === 1 });

// GET /todos - 一覧取得
app.get("/todos", (_req: Request, res: Response) => {
  const rows = db.prepare("SELECT * FROM todos").all() as TodoRow[];
  res.json(rows.map(toTodo));
});

// GET /todos/:id - 1件取得
app.get("/todos/:id", (req: Request, res: Response) => {
  const row = db.prepare("SELECT * FROM todos WHERE id = ?").get(Number(req.params.id)) as TodoRow | undefined;
  if (!row) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(toTodo(row));
});

// POST /todos - 作成
app.post("/todos", (req: Request, res: Response) => {
  const { title } = req.body as { title?: string };
  if (!title) {
    res.status(400).json({ message: "title is required" });
    return;
  }
  const result = db.prepare("INSERT INTO todos (title, done) VALUES (?, 0)").run(title);
  const row = db.prepare("SELECT * FROM todos WHERE id = ?").get(result.lastInsertRowid) as TodoRow;
  res.status(201).json(toTodo(row));
});

// PATCH /todos/:id - 更新
app.patch("/todos/:id", (req: Request, res: Response) => {
  const row = db.prepare("SELECT * FROM todos WHERE id = ?").get(Number(req.params.id)) as TodoRow | undefined;
  if (!row) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  const { title, done } = req.body as { title?: string; done?: boolean };
  const newTitle = title ?? row.title;
  const newDone = done !== undefined ? (done ? 1 : 0) : row.done;
  db.prepare("UPDATE todos SET title = ?, done = ? WHERE id = ?").run(newTitle, newDone, row.id);
  res.json({ id: row.id, title: newTitle, done: newDone === 1 });
});

// DELETE /todos/:id - 削除
app.delete("/todos/:id", (req: Request, res: Response) => {
  const result = db.prepare("DELETE FROM todos WHERE id = ?").run(Number(req.params.id));
  if (result.changes === 0) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(204).send();
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
