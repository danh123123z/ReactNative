// 7. Write a class User with private property name and getter/setter.

export class User{
    private name: string;

    constructor(name: string){
        this.name = name;
    }

    getName(){
        return this.name;
    }

    setName(name: string){
        this.name = name;
    }
}