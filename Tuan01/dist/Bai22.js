"use strict";
// 22. Create a class Stack with push, pop, peek, isEmpty methods.
class Stack {
    constructor() {
        this.items = [];
    }
    push(item) {
        this.items.push(item);
    }
    pop() {
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
}
const stack = new Stack();
console.log(stack.isEmpty());
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.isEmpty());
