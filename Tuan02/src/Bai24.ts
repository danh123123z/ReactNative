// 24. Write an async function postData() that sends a POST request to a test API.

async function postData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Hello", body: "World", userId: 1 })
  });
  return res.json();
}

async function run24() {
  const result = await postData();
  console.log(result);
}

run24();
