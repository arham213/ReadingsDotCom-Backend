import express from 'express';

const PublisherRouter = express.Router();

// Get all Publishers
PublisherRouter.get('/', (req, res) => {});

// Get a single Publisher by ID
PublisherRouter.get('/:publisherId', (req, res) => {});

// Create a new Publisher
PublisherRouter.post('/', (req, res) => {});

// Update a Publisher by ID
PublisherRouter.put('/:publisherId', (req, res) => {});

// Delete a Publisher by ID
PublisherRouter.delete('/:publisherId', (req, res) => {});

export default PublisherRouter;
