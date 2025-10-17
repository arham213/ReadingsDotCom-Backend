import express from 'express';
import { validateRequest } from '../middlewares/validateRequest.js';
import { loginSchema, signupSchema, editUserSchema, userIdParamsSchema, verifyEmailSchema, addToWishListSchema, removeFromWishListSchema } from '../validators/user.js';
import { Signup, VerifyEmail, Login, EditUser, AddToWishList, DeleteUser } from '../controllers/user.js';

const UserRouter = express.Router();

// User Signup
UserRouter.post('/signup', validateRequest({ body: signupSchema }), Signup);

// User Email Verification
UserRouter.post('/verifyEmail', validateRequest({ body: verifyEmailSchema }), VerifyEmail);

// User Login
UserRouter.post('/login', validateRequest({ body: loginSchema }), Login);

// Edit User By Id
UserRouter.put('/:userId', validateRequest({ body: editUserSchema, params: userIdParamsSchema }), EditUser);

// Remove User By Id
UserRouter.delete('/:userId', validateRequest({ params: userIdParamsSchema }), DeleteUser);

// Add item to wishlist
UserRouter.post('/:userId/wishlist/:bookId', validateRequest({ body: addToWishListSchema }), AddToWishList);

// Remove item from wishlist
UserRouter.delete('/:userId/wishlist/:bookId', validateRequest({ params: removeFromWishListSchema }), (req, res) => { });

export default UserRouter;