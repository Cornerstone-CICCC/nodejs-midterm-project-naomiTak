"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_model_1 = __importDefault(require("../models/book.model"));
// Get all articles
const getBooks = (req, res) => {
    const { userId } = req.session;
    const books = book_model_1.default.findAll(userId);
    res.json(books);
};
// Get article by id
const getBookById = (req, res) => {
    const { bookId } = req.params;
    const book = book_model_1.default.findById(bookId);
    if (!book) {
        res.status(200).json({ message: 'The Book not found' });
        return;
    }
    else {
        res.status(404).json({ message: 'The Book is already in Bookshelf' });
        return;
    }
};
// Add article
const addBook = (req, res) => {
    const { userId } = req.session;
    const { bookId, title, author, status, image } = req.body;
    if (!title || !userId) {
        res.status(400).json({ message: 'Missing title or user id' });
        return;
    }
    const book = book_model_1.default.create({ bookId, title, author, status, image, userId });
    res.status(201).json(book);
};
// Update article by id
const updateBookById = (req, res) => {
    const { userId } = req.session;
    const { bookId } = req.params;
    const { status } = req.body;
    const article = book_model_1.default.edit(bookId, { status });
    if (!article) {
        res.status(404).json({ message: "Article not found" });
        return;
    }
    res.json(article);
};
// Delete article by id
const deleteBookById = (req, res) => {
    const { userId } = req.session;
    const { bookId } = req.params;
    console.log(req.params);
    const response = book_model_1.default.delete(bookId, userId);
    if (!response) {
        res.status(404).json({ message: "Article not found" });
        return;
    }
    res.status(204).send();
};
exports.default = {
    getBooks,
    getBookById,
    addBook,
    updateBookById,
    deleteBookById
};
