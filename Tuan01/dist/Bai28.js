"use strict";
// 28. Create a class Animal with protected method makeSound(). Extend Dog and Cat to override it.
class Animal {
    makeSound() {
        console.log("Âm thanh chung của động vật...");
    }
    sound() {
        this.makeSound();
    }
}
class Dog extends Animal {
    makeSound() {
        console.log("Gâu gâu!");
    }
}
class Cat extends Animal {
    makeSound() {
        console.log("Meo meo!");
    }
}
const dog = new Dog();
const cat = new Cat();
dog.sound();
cat.sound();
