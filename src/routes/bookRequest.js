import express from 'express';
import { GetAllBookRequests, GetBookRequestById, CreateBookRequest, DeleteBookRequest, UpdateBookRequest } from '../controllers/bookRequest.js';

const BookRequestRouter = express.Router();

// Get all BookRequests
BookRequestRouter.get('/', GetAllBookRequests);

// Get a single BookRequest by ID
BookRequestRouter.get('/:bookRequestId', GetBookRequestById);

// Create a new BookRequest
BookRequestRouter.post('/', CreateBookRequest);

// Update a BookRequest by ID
BookRequestRouter.put('/:bookRequestId', UpdateBookRequest);

// Delete a BookRequest by ID
BookRequestRouter.delete('/:bookRequestId', DeleteBookRequest);

export default BookRequestRouter;
