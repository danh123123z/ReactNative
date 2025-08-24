// 21. Create a generic Repository class with methods add(), getAll().

class Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

const stringRepo = new Repository<string>();
stringRepo.add("Hello");
stringRepo.add("World");

console.log(stringRepo.getAll())
