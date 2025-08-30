"use strict";
// 17. Use for await...of to iterate over an array of Promises.
async function task17(num) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return num * 2;
}
async function run17() {
    const promises = [task17(1), task17(2), task17(3)];
    for await (const result of promises) {
        console.log(result);
    }
}
run17();
