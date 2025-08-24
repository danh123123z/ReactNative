// 29. Create an interface Movable with method move(). Implement it in Car and Robot.
interface Movable {
  move(): void;
}

class Car implements Movable {
  move(): void {
    console.log("Xe hơi đang di chuyển trên đường.");
  }
}

class Robot implements Movable {
  move(): void {
    console.log("Robot đang đi bộ.");
  }
}

const car: Movable = new Car();
const robot: Movable = new Robot();

car.move();
robot.move();
