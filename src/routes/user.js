import express from 'express';
import { validateRequest } from '../middlewares/validateRequest.js';
import { loginSchema, signupSchema, editUserSchema, objectIdParamsSchema, verifyEmailSchema, addToWishListSchema, removeFromWishListSchema, resetPasswordSchema } from '../validators/user.js';
import { Signup, VerifyEmail, Login, EditUser, AddToWishList, DeleteUser, ResendOTP, ForgotPassword, ResetPassword, RemoveFromWishlist, GetUserById, GetWishList } from '../controllers/user.js';
import { resendOTPLimiter } from '../middlewares/rateLimiter.js';
import { authMiddleware } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const UserRouter = express.Router();

// User Resend OTP
UserRouter.get('/:userId/resendOTP', resendOTPLimiter, validateRequest({ params: objectIdParamsSchema }), ResendOTP);

// Get Wishlist
UserRouter.get('/wishlistItems', authMiddleware, GetWishList);

// User Signup
UserRouter.post('/signup', validateRequest({ body: signupSchema }), Signup);

// User Email Verification
UserRouter.post('/verifyEmail', validateRequest({ body: verifyEmailSchema }), VerifyEmail);

// User Login
UserRouter.post('/login', validateRequest({ body: loginSchema }), Login);

// User Forgot Password
UserRouter.post('/forgotPassword', resendOTPLimiter, validateRequest({ params: objectIdParamsSchema}), ForgotPassword);

// User Reset Password
UserRouter.post('/resetPassword', validateRequest({ body: resetPasswordSchema }), ResetPassword);

// Edit User By Id
UserRouter.put('/:userId', authMiddleware, validateRequest({ body: editUserSchema, params: objectIdParamsSchema }), EditUser);

// Get User By Id
UserRouter.get('/:userId', authMiddleware, validateRequest({ params: objectIdParamsSchema }), GetUserById);

// Remove User By Id
UserRouter.delete('/:userId', authMiddleware, validateRequest({ params: objectIdParamsSchema }), DeleteUser);

// Add item to wishlist
UserRouter.post('/wishlist/:bookId', authMiddleware, authorizeRoles("user"), validateRequest({ params: addToWishListSchema }), AddToWishList);

// Remove item from wishlist
UserRouter.delete('/wishlist/:bookId', authMiddleware, authorizeRoles("user"), validateRequest({ params: removeFromWishListSchema }), RemoveFromWishlist);

export default UserRouter;