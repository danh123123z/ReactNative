"use strict";
// 18. Write an async function fetchUser(id) that simulates an API call (resolves a user object after 1 second).
async function fetchUser(id) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { id, name: `User ${id}` };
}
async function run18() {
    const user = await fetchUser(1);
    console.log(user);
}
run18();
