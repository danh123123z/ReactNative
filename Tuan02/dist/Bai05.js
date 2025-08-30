"use strict";
// 5. Create a function simulateTask(time) that returns a Promise resolving with "Task
// done" after time ms.
const simulateTask = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
};
simulateTask(2000).then(msg => console.log(msg));
