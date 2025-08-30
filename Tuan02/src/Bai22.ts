// 22. Call the API multiple times and log the results.

async function run22() {
  for (let i = 1; i <= 3; i++) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${i}`);
    const data = await res.json();
    console.log(data);
  }
}

run22();
