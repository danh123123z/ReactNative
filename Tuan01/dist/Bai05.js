"use strict";
// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
class BankAccount {
    constructor(balance) {
        this.balance = balance;
    }
    deposit(amount) {
        if (amount <= 0) {
            console.log("So tien nap vao phai lon hon 0");
            return;
        }
        this.balance += amount;
        console.log(`New balance: $${this.balance}`);
    }
    withdraw(amount) {
        if (amount <= 0) {
            console.log("So tien nap vao phai lon hon 0");
            return;
        }
        if (amount > this.balance) {
            console.log("Khong du tien de rut");
            return;
        }
        this.balance -= amount;
        console.log(`New balance: $${this.balance}`);
    }
}
exports.BankAccount = BankAccount;
