// API functions for MockAPI synchronization

export type ExpenseAPI = {
  id?: string;
  title: string;
  amount: number;
  type: "Thu" | "Chi";
  createdAt: string;
  deleted: number;
};

// Lấy tất cả expenses từ API
export async function getAllExpensesFromAPI(apiUrl: string): Promise<ExpenseAPI[]> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching from API:", error);
    throw error;
  }
}

// Xóa một expense từ API
export async function deleteExpenseFromAPI(apiUrl: string, id: string): Promise<void> {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(`❌ Error deleting expense ${id}:`, error);
    throw error;
  }
}

// Xóa tất cả expenses từ API
export async function clearAllExpensesFromAPI(apiUrl: string): Promise<void> {
  const expenses = await getAllExpensesFromAPI(apiUrl);
  const deletePromises = expenses.map((expense) =>
    deleteExpenseFromAPI(apiUrl, expense.id!)
  );
  await Promise.all(deletePromises);
  console.log(`✅ Cleared ${expenses.length} expenses from API`);
}

// Thêm một expense vào API
export async function addExpenseToAPI(apiUrl: string, expense: ExpenseAPI): Promise<ExpenseAPI> {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("❌ Error adding expense to API:", error);
    throw error;
  }
}

// Đồng bộ tất cả expenses từ local DB lên API
export async function syncExpensesToAPI(
  apiUrl: string,
  expenses: ExpenseAPI[]
): Promise<void> {
  try {
    // 1. Xóa tất cả dữ liệu cũ trên API
    console.log("🗑️ Clearing old data from API...");
    await clearAllExpensesFromAPI(apiUrl);

    // 2. Upload từng expense lên API
    console.log(`📤 Uploading ${expenses.length} expenses to API...`);
    for (const expense of expenses) {
      await addExpenseToAPI(apiUrl, expense);
    }
    console.log("✅ Sync completed successfully!");
  } catch (error) {
    console.error("❌ Sync failed:", error);
    throw error;
  }
}

// Validate API URL
export function validateAPIUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return (
      urlObj.protocol === "https:" &&
      (urlObj.hostname.includes("mockapi.io") ||
        urlObj.hostname.includes("mockapi.com"))
    );
  } catch {
    return false;
  }
}
