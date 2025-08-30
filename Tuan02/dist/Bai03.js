"use strict";
// 3. Write a function that rejects a Promise with the error "Something went wrong" after 1 second.
const getError = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject("Something went wrong");
        }, 1000);
    });
};
getError().catch(err => console.error(err));
