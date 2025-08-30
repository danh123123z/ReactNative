"use strict";
// 9. Write a Promise that reads an array after 1 second and filters even numbers.
const numbers = [1, 2, 3, 4, 5, 6];
const evenPromise = new Promise((resolve) => {
    setTimeout(() => {
        const evens = numbers.filter(n => n % 2 === 0);
        resolve(evens);
    }, 1000);
});
evenPromise.then(result => console.log("Số chẳn:", result));
