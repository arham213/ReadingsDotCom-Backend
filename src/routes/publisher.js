import express from 'express';

import { GetAllPublishers, GetPublisherById, CreatePublisher, DeletePublisher, UpdatePublisher } from '../controllers/publisher.js';

const PublisherRouter = express.Router();

// Get all Publishers
PublisherRouter.get('/', GetAllPublishers);

// Get a single Publisher by ID
PublisherRouter.get('/:publisherId', GetPublisherById);

// Create a new Publisher
PublisherRouter.post('/', CreatePublisher);

// Update a Publisher by ID
PublisherRouter.put('/:publisherId', UpdatePublisher);

// Delete a Publisher by ID
PublisherRouter.delete('/:publisherId', DeletePublisher);

export default PublisherRouter;
