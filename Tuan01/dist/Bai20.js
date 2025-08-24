"use strict";
class Car {
    constructor(brand, speed) {
        this.brand = brand;
        this.speed = speed;
    }
    start() {
        console.log(`${this.brand} car khởi động với tốc độ ${this.speed} km/h.`);
    }
    stop() {
        console.log(`${this.brand} car đã dừng lại.`);
    }
}
class Bike {
    constructor(brand, speed) {
        this.brand = brand;
        this.speed = speed;
    }
    start() {
        console.log(`${this.brand} bike bắt đầu chạy ở tốc độ ${this.speed} km/h.`);
    }
    stop() {
        console.log(`${this.brand} bike đã dừng lại.`);
    }
}
const car = new Car("Toyota", 120);
const bike = new Bike("Yamaha", 60);
car.start();
car.stop();
bike.start();
bike.stop();
