import * as SQLite from "expo-sqlite";

export async function openDB() {
  const db = await SQLite.openDatabaseAsync("expenses.db");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);
  return db;
}

export async function addExpense(title: string, amount: number, type: "Thu" | "Chi") {
  const db = await openDB();
  const createdAt = new Date().toLocaleDateString("vi-VN");
  await db.runAsync(
    "INSERT INTO expenses (title, amount, type, createdAt) VALUES (?, ?, ?, ?)",
    [title, amount, type, createdAt]
  );
}

export async function getExpenses() {
  const db = await openDB();
  return db.getAllAsync("SELECT * FROM expenses ORDER BY id DESC");
}
