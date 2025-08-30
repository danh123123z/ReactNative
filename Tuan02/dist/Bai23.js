"use strict";
// 23. Fetch a list of todos and filter out those that are not completed.
async function fetchCompletedTodos() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await res.json();
    return todos.filter((t) => t.completed);
}
async function run23() {
    const completed = await fetchCompletedTodos();
    console.log("Completed todos:", completed);
}
run23();
