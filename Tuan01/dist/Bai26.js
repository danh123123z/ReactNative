"use strict";
// 26. Create a class Order with list of products. Add method to calculate total price.
// Định nghĩa Product
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
class Order {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    calculateTotal() {
        return this.products.reduce((sum, p) => sum + p.price, 0);
    }
}
const order = new Order();
order.addProduct(new Product("Sách", 100));
order.addProduct(new Product("Bút", 20));
order.addProduct(new Product("Vở", 50));
console.log("Tổng tiền:", order.calculateTotal());
