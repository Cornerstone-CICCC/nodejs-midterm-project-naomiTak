"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BookModel {
    constructor() {
        this.books = [];
    }
    findAll(userId) {
        const books = this.books.filter(book => book.userId === userId);
        return books;
    }
    findById(id) {
        const book = this.books.find(book => book.bookId === id);
        if (!book)
            return undefined;
        return book;
    }
    create(newData) {
        const newArticle = Object.assign({}, newData);
        this.books.push(newArticle);
        return newArticle;
    }
    edit(bookId, newData) {
        const index = this.books.findIndex(book => book.bookId === bookId);
        if (index === -1)
            return undefined;
        if (this.books[index].userId !== newData.userId)
            return undefined;
        const updatedArticle = Object.assign(Object.assign({}, this.books[index]), newData);
        this.books[index] = updatedArticle;
        return updatedArticle;
    }
    delete(bookId, userId) {
        const index = this.books.findIndex(book => book.bookId === bookId && book.userId === userId);
        console.log(`${userId}:${bookId}:${index}`);
        if (index === 1)
            return false;
        this.books.splice(index, 1);
        return true;
    }
}
exports.default = new BookModel;
