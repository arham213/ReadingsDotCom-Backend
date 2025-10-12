import express from 'express';

const AuthorRouter = express.Router();

// Get all Authors
AuthorRouter.get('/', (req, res) => {});

// Get a single Author by ID
AuthorRouter.get('/:authorId', (req, res) => {});

// Create a new Author
AuthorRouter.post('/', (req, res) => {});

// Update an Author by ID
AuthorRouter.put('/:authorId', (req, res) => {});

// Delete an Author by ID
AuthorRouter.delete('/:authorId', (req, res) => {});

export default AuthorRouter;
