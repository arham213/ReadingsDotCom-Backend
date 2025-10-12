import express from 'express';

const UserRouter = express.Router();

// Authentication
UserRouter.post('/signup', (req, res) => {});
UserRouter.post('/login', (req, res) => {});

// Profile
UserRouter.put('/:userId', (req, res) => {});
UserRouter.get('/:userId', (req, res) => {});

// Wishlist
UserRouter.post('/wishlist', (req, res) => {});
UserRouter.delete('/:userId/wishlist/:bookId', (req, res) => {});

export default UserRouter;