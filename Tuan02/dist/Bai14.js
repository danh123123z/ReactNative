"use strict";
// 14. Write an async function that takes a number, waits 1 second, and returns the number × 3.
async function multiplyBy3(num) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return num * 3;
}
async function run14() {
    const result = await multiplyBy3(5);
    console.log("Result:", result);
}
run14();
