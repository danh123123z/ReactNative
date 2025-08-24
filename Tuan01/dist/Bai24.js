"use strict";
// 24. Create an abstract class Appliance with method turnOn(). Implement Fan and AirConditioner.
class Appliance {
}
class Fan extends Appliance {
    turnOn() {
        console.log("Bật quạt.");
    }
}
class AirConditioner extends Appliance {
    turnOn() {
        console.log("Bật máy lạnh.");
    }
}
const fan = new Fan();
const ac = new AirConditioner();
fan.turnOn();
ac.turnOn();
