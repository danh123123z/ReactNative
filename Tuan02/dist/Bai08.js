"use strict";
// 8. Create a Promise chain: square the number 2, then double it, then add 5.
Promise.resolve(2)
    .then(num => num * num)
    .then(num => num * 2)
    .then(num => num + 5)
    .then(result => console.log("Kết quả:", result));
