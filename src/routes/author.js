import express from 'express';
import { GetAllAuthors, GetAuthorById, CreateAuthor, DeleteAuthor, UpdateAuthor } from '../controllers/author.js';

const AuthorRouter = express.Router();

// Get all Authors
AuthorRouter.get('/', GetAllAuthors);

// Get a single Author by ID
AuthorRouter.get('/:authorId', GetAuthorById);

// Create a new Author
AuthorRouter.post('/', CreateAuthor);

// Update an Author by ID
AuthorRouter.put('/:authorId', UpdateAuthor);

// Delete an Author by ID
AuthorRouter.delete('/:authorId', DeleteAuthor);

export default AuthorRouter;
