"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bai01_1 = require("./Bai01");
const Bai02_1 = require("./Bai02");
// 1. Create a class Person with attributes name and age. Write a method to display this information.
const person = new Bai01_1.Person("Dao Duc Danh", 18);
person.display();
// 2. Write a class Student extending Person with an additional attribute grade. Add a method to
// display all info.
const student = new Bai02_1.Student("Dao Duc Danh", 18, 10);
student.display();
