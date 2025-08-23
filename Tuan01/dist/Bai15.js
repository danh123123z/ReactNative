"use strict";
// 15. Create a Library class that can store Book and User objects. Add method to add books.
class Book {
    constructor(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }
}
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    addUser(user) {
        this.users.push(user);
    }
    showBooks() {
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
