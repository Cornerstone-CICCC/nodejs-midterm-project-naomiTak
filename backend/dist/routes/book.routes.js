"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
const auth_1 = require("../middleware/auth");
const bookRouter = (0, express_1.Router)();
bookRouter.post('/add', auth_1.cookieAuthCheck, book_controller_1.default.addBook);
bookRouter.put('/update/:bookId', auth_1.cookieAuthCheck, book_controller_1.default.updateBookById);
bookRouter.delete('/delete/:bookId', auth_1.cookieAuthCheck, book_controller_1.default.deleteBookById);
bookRouter.get('/:id', auth_1.cookieAuthCheck, book_controller_1.default.getBookById);
bookRouter.get('/', auth_1.cookieAuthCheck, book_controller_1.default.getBooks);
exports.default = bookRouter;
