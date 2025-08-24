// 24. Create an abstract class Appliance with method turnOn(). Implement Fan and AirConditioner.

abstract class Appliance {
  abstract turnOn(): void;
}

class Fan extends Appliance {
  turnOn(): void {
    console.log("Bật quạt.");
  }
}

class AirConditioner extends Appliance {
  turnOn(): void {
    console.log("Bật máy lạnh.");
  }
}

const fan = new Fan();
const ac = new AirConditioner();

fan.turnOn();
ac.turnOn();  
