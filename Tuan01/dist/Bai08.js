"use strict";
// 8. Create a Product class with name, price. Create an array of products and filter products with
// price > 100.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    display() {
        console.log(`Name: ${this.name}, Price: ${this.price}`);
    }
}
exports.Product = Product;
