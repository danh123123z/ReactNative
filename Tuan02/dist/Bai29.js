"use strict";
// 29. queueProcess: processes tasks sequentially in a queue.
async function task29(i) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `Task ${i} done`;
}
async function queueProcess() {
    for (let i = 1; i <= 5; i++) {
        const result = await task29(i);
        console.log(result);
    }
}
queueProcess();
