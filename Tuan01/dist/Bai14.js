"use strict";
// 14. Create a base class Employee. Extend Manager and Developer with specific methods.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Developer = exports.Manager = exports.Employee = void 0;
class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    work() {
        console.log(`Class cha: ${this.name}`);
    }
}
exports.Employee = Employee;
class Manager extends Employee {
    manageTeam() {
        console.log(`Manager: ${this.name}`);
    }
}
exports.Manager = Manager;
class Developer extends Employee {
    writeCode() {
        console.log(`Developer: ${this.name}`);
    }
}
exports.Developer = Developer;
