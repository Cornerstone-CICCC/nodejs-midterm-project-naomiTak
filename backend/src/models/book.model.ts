import { v4 as uuidv4 } from 'uuid'
import { Book } from '../types/book'

class BookModel {
  private books: Book[] = []

  findAll(userId: string): Book[] {
    const books = this.books.filter(book => book.userId === userId)
    return books
  }

  findById(id: string): Book | undefined {
    const book = this.books.find(book => book.bookId === id)
    if (!book) return undefined
    return book
  }

  create(newData: Book): Book {
    const newArticle = {
      ...newData
    }
    this.books.push(newArticle)
    return newArticle
  }

  edit(bookId: string, newData: Partial<Book>): Book | undefined {
    const index = this.books.findIndex(book => book.bookId === bookId)
    if (index === -1) return undefined
    if (this.books[index].userId !== newData.userId) return undefined
    const updatedArticle = {
      ...this.books[index],
      ...newData
    }
    this.books[index] = updatedArticle
    return updatedArticle
  }

  delete(bookId: string, userId: string): boolean {
    const index = this.books.findIndex(book => book.bookId === bookId && book.userId === userId)
    if (index === 1) return false
    this.books.splice(index, 1)
    return true
  }
}

export default new BookModel