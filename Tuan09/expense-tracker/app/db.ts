import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;
let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export async function openDB() {
  if (db) return db; // ✅ Trả về instance đã tồn tại

  // ✅ Nếu đang trong quá trình mở, đợi promise đó
  if (dbPromise) return dbPromise;

  // ✅ Tạo promise mới và cache nó
  dbPromise = (async () => {
    const database = await SQLite.openDatabaseAsync("expenses.db");

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        deleted INTEGER DEFAULT 0
      );
    `);

    // ✅ Migration: Thêm cột deleted nếu chưa có
    try {
      await database.execAsync(`
        ALTER TABLE expenses ADD COLUMN deleted INTEGER DEFAULT 0;
      `);
      console.log("✅ Added 'deleted' column");
    } catch (error) {
      // Cột đã tồn tại, bỏ qua lỗi
      console.log("ℹ️ Column 'deleted' already exists");
    }

    // 🌱 Seed dữ liệu mẫu nếu chưa có dữ liệu
    const count = await database.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM expenses"
    );

    if (count?.count === 0) {
      console.log("🌱 Seeding sample expenses data...");
      const sampleExpenses = [
        { title: "Lương tháng 11", amount: 15000000, type: "Thu", createdAt: "01/11/2025" },
        { title: "Tiền điện tháng 10", amount: 500000, type: "Chi", createdAt: "01/11/2025" },
        { title: "Mua sắm thực phẩm", amount: 1200000, type: "Chi", createdAt: "02/11/2025" },
      ];

      for (const expense of sampleExpenses) {
        await database.runAsync(
          "INSERT INTO expenses (title, amount, type, createdAt) VALUES (?, ?, ?, ?)",
          [expense.title, expense.amount, expense.type, expense.createdAt]
        );
      }
      console.log("✅ Sample expenses inserted successfully");
    }

    db = database;
    dbPromise = null; // Reset promise sau khi hoàn thành
    return database;
  })();

  return dbPromise;
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
  return db.getAllAsync("SELECT * FROM expenses WHERE deleted = 0 ORDER BY id DESC");
}

export async function getDeletedExpenses() {
  const db = await openDB();
  return db.getAllAsync("SELECT * FROM expenses WHERE deleted = 1 ORDER BY id DESC");
}

export async function updateExpense(id: number, title: string, amount: number, type: "Thu" | "Chi") {
  const db = await openDB();
  await db.runAsync(
    "UPDATE expenses SET title = ?, amount = ?, type = ? WHERE id = ?",
    [title, amount, type, id]
  );
}

export async function deleteExpense(id: number) {
  const db = await openDB();
  // Soft delete - chuyển vào trash
  await db.runAsync("UPDATE expenses SET deleted = 1 WHERE id = ?", [id]);
}

export async function permanentDeleteExpense(id: number) {
  const db = await openDB();
  // Hard delete - xóa vĩnh viễn
  await db.runAsync("DELETE FROM expenses WHERE id = ?", [id]);
}

export async function restoreExpense(id: number) {
  const db = await openDB();
  // Khôi phục từ trash
  await db.runAsync("UPDATE expenses SET deleted = 0 WHERE id = ?", [id]);
}
