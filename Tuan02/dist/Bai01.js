"use strict";
// 1. Create a Promise that returns the string "Hello Async" after 2 seconds.
const helloPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});
helloPromise.then((msg) => console.log(msg));
