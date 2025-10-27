import express from 'express';
import { AdvancedBookSearch, CreateBook, DeleteBook, GetAllBooks, GetBookById, GetBooksByCategory, SearchBooks, UpdateBook } from '../controllers/book.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';

const BookRouter = express.Router();

// Search Books
BookRouter.get('/search', SearchBooks);

// Advance Search for Books
BookRouter.get('/advanced-search', AdvancedBookSearch);

// Get All books
BookRouter.get('/', authorizeRoles("admin"), GetAllBooks);

// Get Books By Category
BookRouter.get('/:categoryCode', GetBooksByCategory)

// Get a single book by ID
BookRouter.get('/:bookId', GetBookById);

// Create a new book
BookRouter.post('/', authorizeRoles("admin"), CreateBook);

// Update a book by ID
BookRouter.put('/:bookId', authorizeRoles("admin"), UpdateBook);

// Delete a book by ID
BookRouter.delete('/:bookId', authorizeRoles("admin"), DeleteBook);

export default BookRouter;