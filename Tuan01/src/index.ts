import { Person } from "./Bai01";
import { Student } from "./Bai02";
import { Car } from "./Bai03";

// 1. Create a class Person with attributes name and age. Write a method to display this information.
const person = new Person("Dao Duc Danh", 18);
person.display()

// 2. Write a class Student extending Person with an additional attribute grade. Add a method to
// display all info.

const student =  new Student("Dao Duc Danh", 18, 10);
student.display()

// 3. Create a class Car with properties brand, model, year. Write a method to show car info.
const car = new Car("Honda", "Toyota", 2024);
car.showInfo()