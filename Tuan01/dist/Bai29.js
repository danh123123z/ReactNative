"use strict";
class Car {
    move() {
        console.log("Xe hơi đang di chuyển trên đường.");
    }
}
class Robot {
    move() {
        console.log("Robot đang đi bộ.");
    }
}
const car = new Car();
const robot = new Robot();
car.move();
robot.move();
