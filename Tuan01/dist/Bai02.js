"use strict";
// 2. Write a class Student extending Person with an additional attribute grade. Add a method to
// display all info.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const Bai01_1 = require("./Bai01");
class Student extends Bai01_1.Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    display() {
        console.log(`Name: ${this.name}, age: ${this.age}, grade: ${this.grade}`);
    }
}
exports.Student = Student;
