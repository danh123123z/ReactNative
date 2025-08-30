// 27. fetchWithRetry: retries up to N times if the API call fails.

async function fetchWithRetry(url: string, retries: number): Promise<any> {
  let lastError: any;

  for (let i = 1; i <= retries; i++) {
    try {
      console.log(`Thử lần ${i}...`);
      const res = await fetch(url);

      if (!res.ok) throw new Error(`Lỗi HTTP: ${res.status}`);

      const data = await res.json();
      console.log("✅ Thành công!");
      return data;
    } catch (err) {
      console.error(`Lỗi lần ${i}:`, err);
      lastError = err;
    }
  }

  throw new Error(`Thất bại sau ${retries} lần thử: ${lastError}`);
}

async function run27() {
  try {
    const data = await fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3);
    console.log("Kết quả:", data);
  } catch (err) {
    console.error("Kết quả cuối cùng:", err);
  }
}

run27();