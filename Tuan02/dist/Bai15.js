"use strict";
// 15. Call multiple async functions sequentially using await.
async function task15(name, time) {
    await new Promise(resolve => setTimeout(resolve, time));
    return `${name} done`;
}
async function run15() {
    const r1 = await task15("Task 1", 1000);
    console.log(r1);
    const r2 = await task15("Task 2", 1000);
    console.log(r2);
    const r3 = await task15("Task 3", 1000);
    console.log(r3);
}
run15();
