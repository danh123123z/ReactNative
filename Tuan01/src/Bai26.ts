// 26. Create a class Order with list of products. Add method to calculate total price.

// Định nghĩa Product
class Product {
  constructor(public name: string, public price: number) { }
}

class Order {
  private products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
  }

  calculateTotal(): number {
    return this.products.reduce((sum, p) => sum + p.price, 0);
  }
}

const order = new Order();
order.addProduct(new Product("Sách", 100));
order.addProduct(new Product("Bút", 20));
order.addProduct(new Product("Vở", 50));

console.log("Tổng tiền:", order.calculateTotal()); 
