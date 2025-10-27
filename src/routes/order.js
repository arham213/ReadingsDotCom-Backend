import express from 'express';
import { DeleteOrder, GetAllOrders, GetOrdersByUser, PlaceOrder, UpdateOrder } from '../controllers/order.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';

const OrderRouter = express.Router();

// Get All Orders
OrderRouter.get('/', authorizeRoles("admin"), GetAllOrders);

// Get All Orders by userId
OrderRouter.get('/myOrders', authorizeRoles("user"), GetOrdersByUser);

// Place Order
OrderRouter.post('/placeOrder', authorizeRoles("user"), PlaceOrder);

// Update Order Status
OrderRouter.put('/', authorizeRoles("admin"), UpdateOrder);

// Delete Order
OrderRouter.delete('/:orderId', authorizeRoles("admin"), DeleteOrder);

export default OrderRouter;
