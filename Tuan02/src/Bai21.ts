// 21. Use fetch to get data from a public API (https://jsonplaceholder.typicode.com/todos/1)

async function run21() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await res.json();
  console.log(data);
}

run21();