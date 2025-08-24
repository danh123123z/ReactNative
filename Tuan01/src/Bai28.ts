// 28. Create a class Animal with protected method makeSound(). Extend Dog and Cat to override it.
class Animal {
  protected makeSound(): void {
    console.log("Âm thanh chung của động vật...");
  }

  public sound(): void {
    this.makeSound();
  }
}

class Dog extends Animal {
  protected makeSound(): void {
    console.log("Gâu gâu!");
  }
}

class Cat extends Animal {
  protected makeSound(): void {
    console.log("Meo meo!");
  }
}

const dog = new Dog();
const cat = new Cat();

dog.sound();
cat.sound();

