"use strict";
// 19. Demonstrate method overriding using polymorphism with Animal and subclasses.// Lớp cha
class Animal {
    makeSound() {
        console.log("Âm thanh chung của động vật...");
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
function playWithAnimal(animal) {
    animal.makeSound();
}
const cho = new Dog();
const meo = new Cat();
const dongVat = new Animal();
playWithAnimal(cho);
playWithAnimal(meo);
playWithAnimal(dongVat);
