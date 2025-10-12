import express from 'express';

const CategoryRouter = express.Router();

// Get all Categories
CategoryRouter.get('/', (req, res) => {});

// Get a single Category by ID
CategoryRouter.get('/:categoryId', (req, res) => {});

// Create a new Category
CategoryRouter.post('/', (req, res) => {});

// Update a Category by ID
CategoryRouter.put('/:categoryId', (req, res) => {});

// Delete a Category by ID
CategoryRouter.delete('/:categoryId', (req, res) => {});

export default CategoryRouter;
