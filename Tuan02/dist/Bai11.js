"use strict";
// 11. Convert Exercise 1 into async/await.
async function helloAsync() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "Hello Async";
}
helloAsync().then(msg => console.log(msg));
