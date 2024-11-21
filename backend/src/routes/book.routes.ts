import { Router, Request, Response } from 'express'
import bookController from '../controllers/book.controller'
import { cookieAuthCheck } from '../middleware/auth'

const bookRouter = Router()

bookRouter.post('/add', cookieAuthCheck, bookController.addBook)
bookRouter.put('/update/:bookId', cookieAuthCheck, bookController.updateBookById)
bookRouter.delete('/delete/:bookId', cookieAuthCheck, bookController.deleteBookById)
bookRouter.get('/:id', cookieAuthCheck, bookController.getBookById)
bookRouter.get('/', cookieAuthCheck, bookController.getBooks)

export default bookRouter