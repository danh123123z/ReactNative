// 11. Create a base class Animal. Extend Dog and Cat classes with methods bark() and meow().

class Animal {
    name: string;

    constructor(name: string){
        this.name = name;
    }
}

export class Dog extends Animal {
    constructor(name: string){
        super(name)
    }

    bark(){
        console.log("Bark")
    }
}

export class Cat extends Animal {
    constructor(name: string){
        super(name)
    }

    meow(){
        console.log("Meow")
    }
}