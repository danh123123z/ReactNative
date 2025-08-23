import { Person } from "./Bai01";
import { Student } from "./Bai02";
import { Car } from "./Bai03";
import { Rectangle } from "./Bai04";
import { BankAccount } from "./Bai05";
import { Book } from "./Bai06";
import { User } from "./Bai07";
import { Product } from "./Bai08";
import { Cat, Dog } from "./Bai11";
import { Bird, Fish } from "./Bai12";
import { Circle, Square } from "./Bai13";
import { Developer, Manager } from "./Bai14";

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

// 4. Create a class Rectangle with width and height. Write a method to calculate area and perimeter.
const rectangle = new Rectangle(10, 20);
console.log(`Area: ${rectangle.calculateArea()}, Perimeter: ${rectangle.calculatePerimeter()}`)

// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().
const bank = new BankAccount(100000);
bank.deposit(50000)
bank.withdraw(20000)

// 6. Create a class Book with attributes title, author, year.
const book = new Book("Lap trinh C", "Danh", 2022);
book.display();

// 7. Write a class User with private property name and getter/setter.
const user = new User("Danh");
console.log(user.getName());
user.setName("Dao Duc Danh");
console.log(user.getName())

// 8. Create a Product class with name, price. Create an array of products and filter products with
// price > 100.

const products = [new Product("Iphon112", 50), new Product("Iphone12", 110), new Product("Iphone13", 150)]
const filterProducts = products.filter(item => item.price > 100);
filterProducts.forEach(product => {
    product.display()
})

// 9. Define an interface Animal with name and method sound().

// 11. Create a base class Animal. Extend Dog and Cat classes with methods bark() and meow().
const dog = new Dog("Chuppy1");
const cat = new Cat("Chuppy2");
dog.bark();
cat.meow();

// 12. Define interfaces Flyable and Swimmable. Implement them in Bird and Fish classes.
const bird = new Bird();
const fish = new Fish();
fish.swim(); 
bird.fly(); 

// 13. Create an abstract class Shape with method area(). Implement Square and Circle.

const square = new Square(5);
const circle = new Circle(3);
console.log(circle.area());
console.log(square.area());

// 14. Create a base class Employee. Extend Manager and Developer with specific methods.
const manager = new Manager("Phuc", 1000);
manager.work();
manager.manageTeam();
const developer = new Developer("Khanh", 2000);
developer.work();
developer.writeCode();
