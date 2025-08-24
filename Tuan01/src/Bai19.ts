// // 19. Demonstrate method overriding using polymorphism with Animal and subclasses.// Lớp cha
// class Animal {
//   makeSound(): void {
//     console.log("Âm thanh chung của động vật...");
//   }
// }

// class Dog extends Animal {
//   makeSound(): void {
//     console.log("Gâu gâu!");
//   }
// }

// class Cat extends Animal {
//   makeSound(): void {
//     console.log("Meo meo!");
//   }
// }

// function playWithAnimal(animal: Animal): void {
//   animal.makeSound();
// }

// const cho: Animal = new Dog();
// const meo: Animal = new Cat();
// const dongVat: Animal = new Animal();

// playWithAnimal(cho);
// playWithAnimal(meo);
// playWithAnimal(dongVat); 
