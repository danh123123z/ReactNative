"use strict";
// 27. Create a class Teacher that extends Person. Add subject attribute and introduce method.
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }
    introduce() {
        console.log(`Xin chào, tôi là ${this.name}, ${this.age} tuổi, dạy môn ${this.subject}.`);
    }
}
const teacher = new Teacher("Danh", 30, "Toán");
teacher.introduce();
