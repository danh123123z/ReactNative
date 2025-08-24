"use strict";
// 21. Create a generic Repository class with methods add(), getAll().
class Repository {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
}
const stringRepo = new Repository();
stringRepo.add("Hello");
stringRepo.add("World");
console.log(stringRepo.getAll());
