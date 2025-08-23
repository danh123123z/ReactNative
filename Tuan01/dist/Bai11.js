"use strict";
// 11. Create a base class Animal. Extend Dog and Cat classes with methods bark() and meow().
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = exports.Dog = void 0;
class Animal {
    constructor(name) {
        this.name = name;
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    bark() {
        console.log("Bark");
    }
}
exports.Dog = Dog;
class Cat extends Animal {
    constructor(name) {
        super(name);
    }
    meow() {
        console.log("Meow");
    }
}
exports.Cat = Cat;
