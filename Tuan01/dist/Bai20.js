"use strict";
// // 20. Write a Vehicle interface and implement it in Car and Bike classes.
// interface Vehicle {
//   brand: string;
//   speed: number;
//   start(): void;
//   stop(): void;
// }
// class Car implements Vehicle {
//   brand: string;
//   speed: number;
//   constructor(brand: string, speed: number) {
//     this.brand = brand;
//     this.speed = speed;
//   }
//   start(): void {
//     console.log(`${this.brand} car khởi động với tốc độ ${this.speed} km/h.`);
//   }
//   stop(): void {
//     console.log(`${this.brand} car đã dừng lại.`);
//   }
// }
// class Bike implements Vehicle {
//   brand: string;
//   speed: number;
//   constructor(brand: string, speed: number) {
//     this.brand = brand;
//     this.speed = speed;
//   }
//   start(): void {
//     console.log(`${this.brand} bike bắt đầu chạy ở tốc độ ${this.speed} km/h.`);
//   }
//   stop(): void {
//     console.log(`${this.brand} bike đã dừng lại.`);
//   }
// }
// const car: Vehicle = new Car("Toyota", 120);
// const bike: Vehicle = new Bike("Yamaha", 60);
// car.start();
// car.stop();
// bike.start();
// bike.stop();  
