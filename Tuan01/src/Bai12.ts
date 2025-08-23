// 12. Define interfaces Flyable and Swimmable. Implement them in Bird and Fish classes.
export interface Flyable {
    fly(): void;
}

export interface Swimmable {
    swim(): void;
}

export class Bird implements Flyable {
    fly(): void {
        console.log("Fly");
    }
}

export class Fish implements Swimmable {
    swim(): void {
        console.log("Swim");
    }
}