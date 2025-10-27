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
import { authMiddleware } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.use('/users', UserRouter);
router.use('/addresses', authMiddleware, AddressRouter);
router.use('/cart', authMiddleware, authorizeRoles("user"), CartRouter);
router.use('/orders', authMiddleware, OrderRouter);
router.use('/books', authMiddleware, BookRouter);
router.use('/categories', authMiddleware, authorizeRoles("admin"), CategoryRouter);
router.use('/authors', authMiddleware, authorizeRoles("admin"), AuthorRouter);
router.use('/publishers', authMiddleware, authorizeRoles("admin"), PublisherRouter);
router.use('/book-requests', BookRequestRouter);

export default router;
