import express from 'express';

const OrderRouter = express.Router();

// Get Single Order of by orderId
OrderRouter.get('/:orderId', (req, res) => {});

// Get All Orders by userId
OrderRouter.get('user/:userId', (req, res) => {});

// Place Order
OrderRouter.post('/placeOrder', (req, res) => {});

// Update Order Status
OrderRouter.put('/:orderId', (req, res) => {});

export default OrderRouter;
