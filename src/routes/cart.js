import express from 'express';
import { addItemToCart, clearCart, deleteItemInCart, getCartByUserId, updateItemInCart } from '../controllers/cart.js';

const CartRouter = express.Router();

// Get cart by user ID
CartRouter.get('/', getCartByUserId);

// Add item to cart
CartRouter.post('/', addItemToCart);

// Update item in the cart by book ID
CartRouter.put('/', updateItemInCart);

// Delete item from the cart by book ID
CartRouter.delete('/', deleteItemInCart);

//clear cart api
CartRouter.delete('/clear-cart', clearCart)

export default CartRouter;
