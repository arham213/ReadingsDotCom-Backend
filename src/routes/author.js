import express from 'express';
import { CreateAuthor, DeleteAuthor, UpdateAuthor, GetAllAuthors, GetAuthorById } from '../controllers/author.js';
import { authMiddleware } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';

const AuthorRouter = express.Router();

// Get all Authors
AuthorRouter.get('/', authMiddleware, authorizeRoles("admin"), GetAllAuthors);

// Get a single Author by ID
AuthorRouter.get('/:authorId', authMiddleware, authorizeRoles("admin"), GetAuthorById);

// Create a new Author
AuthorRouter.post('/', authMiddleware, authorizeRoles("admin"), CreateAuthor);

// Update an Author by ID
AuthorRouter.put('/:authorId', authMiddleware, authorizeRoles("admin"), UpdateAuthor);

// Delete an Author by ID
AuthorRouter.delete('/:authorId', authMiddleware, authorizeRoles("admin"), DeleteAuthor);

export default AuthorRouter;
