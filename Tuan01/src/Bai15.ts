// 15. Create a Library class that can store Book and User objects. Add method to add books.

class Book {
  id: number;
  title: string;
  author: string;

  constructor(id: number, title: string, author: string) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class User {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class Library {
  private books: Book[] = [];
  private users: User[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  showBooks(): void {
    this.books.forEach((book) => {
      console.log(`- ${book.id}: ${book.title} - ${book.author}`);
    });
  }
}

const library = new Library();

library.addBook(new Book(1, "Lap trinh C", "Danh"));
library.addBook(new Book(2, "Lap trinh java", "Danh Dao"));

library.addUser(new User(1, "Duc Danh"));

library.showBooks();
