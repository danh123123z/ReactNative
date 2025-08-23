// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().

export class BankAccount{
    balance: number;

    constructor(balance: number){
        this.balance = balance;
    }

    deposit(amount: number){
        if (amount <= 0) {
            console.log("So tien nap vao phai lon hon 0");
            return;
        }
        this.balance += amount;
        console.log(`New balance: $${this.balance}`);
    }

    withdraw(amount: number){
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