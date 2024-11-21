import { Request, Response } from 'express'
import articleModel from '../models/book.model'
import { Book } from '../types/book'

// Get all articles
const getBooks = (req: Request, res: Response): void => {
    const { userId } = req.session
    const books = articleModel.findAll(userId)
    res.json(books)
}

// Get article by id
const getBookById = (req: Request<{ bookId: string }>, res: Response): void => {
    const { bookId } = req.params
    const book = articleModel.findById(bookId)
    if (!book) {
        res.status(200).json({ message: 'The Book not found' })
        return
    }else{
        res.status(404).json({ message: 'The Book is already in Bookshelf' })
        return
    }
}

// Add article
const addBook = (req: Request<{}, {}, Book>, res: Response): void => {
const { userId } = req.session
const { bookId, title, author, status, image } = req.body
if (!title || !userId) {
    res.status(400).json({ message: 'Missing title or user id' })
    return
}
const book = articleModel.create({ bookId, title, author, status, image, userId })
res.status(201).json(book)
}

// Update article by id
const updateBookById = (req: Request<{ bookId: string }, {}, Partial<Book>>, res: Response): void => {
const { userId } = req.session
const { bookId } = req.params
const { status } = req.body
const article = articleModel.edit(bookId, { status })
if (!article) {
    res.status(404).json({ message: "Article not found" })
    return
}
res.json(article)
}

// Delete article by id
const deleteBookById = (req: Request<{ bookId: string }>, res: Response) => {
    const { userId } = req.session
    const { bookId } = req.params
    const response = articleModel.delete(bookId, userId)
    if (!response) {
        res.status(404).json({ message: "Article not found" })
        return
    }
    res.status(204).send()
}

export default {
getBooks,
getBookById,
addBook,
updateBookById,
deleteBookById
}