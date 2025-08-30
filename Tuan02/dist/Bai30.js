"use strict";
// 30. Use async/await + Promise.allSettled() to handle multiple API calls.
async function run30() {
    const urls = [
        "https://jsonplaceholder.typicode.com/todos/1",
        "https://jsonplaceholder.typicode.com/todos/2",
        "https://jsonplaceholder.typicode.com/invalid"
    ];
    const results = await Promise.allSettled(urls.map(url => fetch(url).then(res => res.json())));
    results.forEach((res, i) => {
        if (res.status === "fulfilled") {
            console.log(`API ${i + 1}:`, res.value);
        }
        else {
            console.log(`API ${i + 1} failed:`, res.reason);
        }
    });
}
run30();
