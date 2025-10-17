import express from 'express';

const BookRouter = express.Router();

// Search Books
BookRouter.get('/search', (req, res) => {});

// Advance Search for Books
BookRouter.get('/advanced-search', (req, res) => {});

// Get all books
BookRouter.get('/', (req, res) => {
    res.send('no books here')
});

// Get a single book by ID
BookRouter.get('/:bookId', (req, res) => {});

// Create a new book
BookRouter.post('/', (req, res) => {});

// Update a book by ID
BookRouter.put('/:bookId', (req, res) => {});

// Delete a book by ID
BookRouter.delete('/:bookId', (req, res) => {});

export default BookRouter;