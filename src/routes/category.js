import express from 'express';
import { GetAllCategories, GetCategoryById, CreateCategory, DeleteCategory, UpdateCategory } from '../controllers/category.js';

const CategoryRouter = express.Router();

// Get all Categories
CategoryRouter.get('/', GetAllCategories);

// Get a single Category by ID
CategoryRouter.get('/:categoryId', GetCategoryById);

// Create a new Category
CategoryRouter.post('/', CreateCategory);

// Update a Category by ID
CategoryRouter.put('/:categoryId', UpdateCategory);

// Delete a Category by ID
CategoryRouter.delete('/:categoryId', DeleteCategory);

export default CategoryRouter;
