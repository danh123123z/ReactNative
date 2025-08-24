"use strict";
// 30. Create a class School with list of Students and Teachers. Add method to display info.
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class Teacher {
    constructor(name, subject) {
        this.name = name;
        this.subject = subject;
    }
}
class School {
    constructor() {
        this.students = [];
        this.teachers = [];
    }
    addStudent(student) {
        this.students.push(student);
    }
    addTeacher(teacher) {
        this.teachers.push(teacher);
    }
    displayInfo() {
        console.log("Danh sách học sinh:");
        this.students.forEach(s => console.log(`- ${s.name}, ${s.age} tuổi`));
        console.log("Danh sách giáo viên:");
        this.teachers.forEach(t => console.log(`- ${t.name}, dạy môn ${t.subject}`));
    }
}
const school = new School();
school.addStudent(new Student("An", 15));
school.addStudent(new Student("Bình", 16));
school.addTeacher(new Teacher("Thầy Nam", "Toán"));
school.addTeacher(new Teacher("Cô Lan", "Văn"));
school.displayInfo();
