import express from 'express';

const BookRequestRouter = express.Router();

// Get all BookRequests
BookRequestRouter.get('/', (req, res) => {});

// Get a single BookRequest by ID
BookRequestRouter.get('/:bookRequestId', (req, res) => {});

// Create a new BookRequest
BookRequestRouter.post('/', (req, res) => {});

// Update a BookRequest by ID
BookRequestRouter.put('/:bookRequestId', (req, res) => {});

// Delete a BookRequest by ID
BookRequestRouter.delete('/:bookRequestId', (req, res) => {});

export default BookRequestRouter;
