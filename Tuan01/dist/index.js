"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bai01_1 = require("./Bai01");
const Bai02_1 = require("./Bai02");
const Bai03_1 = require("./Bai03");
const Bai04_1 = require("./Bai04");
const Bai05_1 = require("./Bai05");
const Bai06_1 = require("./Bai06");
const Bai07_1 = require("./Bai07");
const Bai08_1 = require("./Bai08");
const Bai11_1 = require("./Bai11");
const Bai12_1 = require("./Bai12");
const Bai13_1 = require("./Bai13");
const Bai14_1 = require("./Bai14");
const Bai16_1 = require("./Bai16");
const Bai18_1 = require("./Bai18");
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
// 6. Create a class Book with attributes title, author, year.
const book = new Bai06_1.Book("Lap trinh C", "Danh", 2022);
book.display();
// 7. Write a class User with private property name and getter/setter.
const user = new Bai07_1.User("Danh");
console.log(user.getName());
user.setName("Dao Duc Danh");
console.log(user.getName());
// 8. Create a Product class with name, price. Create an array of products and filter products with
// price > 100.
const products = [new Bai08_1.Product("Iphon112", 50), new Bai08_1.Product("Iphone12", 110), new Bai08_1.Product("Iphone13", 150)];
const filterProducts = products.filter(item => item.price > 100);
filterProducts.forEach(product => {
    product.display();
});
// 9. Define an interface Animal with name and method sound().
// 11. Create a base class Animal. Extend Dog and Cat classes with methods bark() and meow().
const dog = new Bai11_1.Dog("Chuppy1");
const cat = new Bai11_1.Cat("Chuppy2");
dog.bark();
cat.meow();
// 12. Define interfaces Flyable and Swimmable. Implement them in Bird and Fish classes.
const bird = new Bai12_1.Bird();
const fish = new Bai12_1.Fish();
fish.swim();
bird.fly();
// 13. Create an abstract class Shape with method area(). Implement Square and Circle.
const square = new Bai13_1.Square(5);
const circle = new Bai13_1.Circle(3);
console.log(circle.area());
console.log(square.area());
// 14. Create a base class Employee. Extend Manager and Developer with specific methods.
const manager = new Bai14_1.Manager("Phuc", 1000);
manager.work();
manager.manageTeam();
const developer = new Bai14_1.Developer("Khanh", 2000);
developer.work();
developer.writeCode();
// 15. Create a Library class that can store Book and User objects. Add method to add books.
// 16. Create a generic class Box that can store any type of value.
// Example usage
const numberBox = new Bai16_1.Box(123);
console.log("Number:", numberBox.getValue());
const stringBox = new Bai16_1.Box("Hello");
console.log("String:", stringBox.getValue());
const booleanBox = new Bai16_1.Box(true);
console.log("Boolean:", booleanBox.getValue());
// 18. Create a static class MathUtil with methods add(), subtract(), multiply(), divide().
console.log(Bai18_1.MathUtil.add(10, 5));
console.log(Bai18_1.MathUtil.subtract(10, 5));
console.log(Bai18_1.MathUtil.multiply(10, 5));
console.log(Bai18_1.MathUtil.divide(10, 5));
// 19. Demonstrate method overriding using polymorphism with Animal and subclasses.// Lớp cha
