import express from 'express';

const CartRouter = express.Router();

// Get cart by user ID
CartRouter.get('/user/:userId', (req, res) => {});

// Add item to cart
CartRouter.post('/:cartId/book', (req, res) => {});

// Update item in the cart by book ID
CartRouter.put('/:cartId/books/:bookId', (req, res) => {});

// Delete item from the cart by book ID
CartRouter.delete('/:cartId/books/:bookId', (req, res) => {});

export default CartRouter;
