// 20. Add a timeout: if the API call takes more than 2 seconds, throw an error.

async function fetchUserWithTimeout(id: number): Promise<{ id: number; name: string }> {
  const fetchPromise = new Promise<{ id: number; name: string }>(resolve => {
    setTimeout(() => resolve({ id, name: `User ${id}` }), 3000);
  });

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("imeout sau 2 giây")), 2000)
  );

  return Promise.race([fetchPromise, timeoutPromise]);
}

async function run20() {
  try {
    const user = await fetchUserWithTimeout(1);
    console.log(user);
  } catch (err) {
    console.error("Lỗi:", err);
  }
}

run20();
