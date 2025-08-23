"use strict";
// 13. Create an abstract class Shape with method area(). Implement Square and Circle.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = exports.Square = exports.Shape = void 0;
class Shape {
}
exports.Shape = Shape;
class Square extends Shape {
    constructor(sideLength) {
        super();
        this.sideLength = sideLength;
    }
    area() {
        return Math.pow(this.sideLength, 2);
    }
}
exports.Square = Square;
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return Math.PI * Math.pow(this.radius, 2);
    }
}
exports.Circle = Circle;
