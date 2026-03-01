import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const sqlite = new SQLiteConnection(CapacitorSQLite);

let db: SQLiteDBConnection;

export const initDB = async () => {
  db = await sqlite.createConnection(
    "student_tasks_db",
    false,
    "no-encryption",
    1,
    false
  );

  await db.open();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT,
      dueDate TEXT,
      completed INTEGER
    );
  `);
};

export const getTasks = async () => {
  const result = await db.query("SELECT * FROM tasks;");
  return result.values;
};

export const addTaskDB = async (title: string, category: string, dueDate: string) => {
  await db.run(
    `INSERT INTO tasks (title, category, dueDate, completed) VALUES (?, ?, ?, 0);`,
    [title, category, dueDate]
  );
};

export const toggleTaskDB = async (id: number, completed: number) => {
  await db.run(
    `UPDATE tasks SET completed = ? WHERE id = ?;`,
    [completed === 1 ? 0 : 1, id]
  );
};

export const deleteTaskDB = async (id: number) => {
  await db.run(`DELETE FROM tasks WHERE id = ?;`, [id]);
};