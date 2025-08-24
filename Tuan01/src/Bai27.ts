// 27. Create a class Teacher that extends Person. Add subject attribute and introduce method.

class Person {
  constructor(public name: string, public age: number) { }
}

class Teacher extends Person {
  subject: string;

  constructor(name: string, age: number, subject: string) {
    super(name, age);
    this.subject = subject;
  }

  introduce(): void {
    console.log(`Xin chào, tôi là ${this.name}, ${this.age} tuổi, dạy môn ${this.subject}.`);
  }
}

const teacher = new Teacher("Danh", 30, "Toán");
teacher.introduce();
