"use strict";
// 10. Use .finally() to log "Done" when a Promise finishes (success or failure).
const bai10Promise = new Promise((resolve, reject) => {
    const num = Math.random();
    if (num > 0.5) {
        resolve("Success: " + num);
    }
    else {
        reject("Error: number too small");
    }
});
bai10Promise
    .then(result => console.log(result))
    .catch(err => console.error(err))
    .finally(() => console.log("Done"));
