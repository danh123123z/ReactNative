"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bai01_1 = require("./Bai01");
const Bai02_1 = require("./Bai02");
const Bai03_1 = require("./Bai03");
const Bai04_1 = require("./Bai04");
const Bai05_1 = require("./Bai05");
// 1. Create a class Person with attributes name and age. Write a method to display this information.
const person = new Bai01_1.Person("Dao Duc Danh", 18);
person.display();
// 2. Write a class Student extending Person with an additional attribute grade. Add a method to
// display all info.
const student = new Bai02_1.Student("Dao Duc Danh", 18, 10);
student.display();
// 3. Create a class Car with properties brand, model, year. Write a method to show car info.
const car = new Bai03_1.Car("Honda", "Toyota", 2024);
car.showInfo();
// 4. Create a class Rectangle with width and height. Write a method to calculate area and perimeter.
const rectangle = new Bai04_1.Rectangle(10, 20);
console.log(`Area: ${rectangle.calculateArea()}, Perimeter: ${rectangle.calculatePerimeter()}`);
// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().
const bank = new Bai05_1.BankAccount(100000);
bank.deposit(50000);
bank.withdraw(20000);
