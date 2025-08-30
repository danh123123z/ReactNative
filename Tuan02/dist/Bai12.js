"use strict";
// 12. Write an async function that calls simulateTask(2000) and logs the result.
function simulateTask12(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
}
async function runTask12() {
    const result = await simulateTask12(2000);
    console.log(result);
}
runTask12();
