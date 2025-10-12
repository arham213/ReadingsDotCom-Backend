import express from "express";
import UserRouter from "./user.js";
import AddressRouter from "./address.js";
import CartRouter from "./cart.js";
import OrderRouter from "./order.js";
import BookRouter from "./book.js";
import CategoryRouter from "./category.js";
import AuthorRouter from "./author.js";
import PublisherRouter from "./publisher.js";
import BookRequestRouter from "./bookRequest.js";

const router = express.Router();

router.use('/users', UserRouter);
router.use('/addresses', AddressRouter);
router.use('/cart', CartRouter);
router.use('/orders', OrderRouter);
router.use('/books', BookRouter);
router.use('/categories', CategoryRouter);
router.use('/authors', AuthorRouter);
router.use('/publishers', PublisherRouter);
router.use('/book-requests', BookRequestRouter);

export default router;
