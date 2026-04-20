import express from 'express';
import { validateRequest } from '../middlewares/validateRequest.js';
import { loginSchema, signupSchema, objectIdParamsSchema } from '../validators/user.js';
import { Signup, Login, GetUserById } from '../controllers/user.js';
import { authMiddleware } from "../middlewares/auth.js";

const UserRouter = express.Router();

// User Signup
UserRouter.post('/signup', validateRequest({ body: signupSchema }), Signup);

// User Login
UserRouter.post('/login', validateRequest({ body: loginSchema }), Login);

// Get User By Id
UserRouter.get('/:userId', authMiddleware, validateRequest({ params: objectIdParamsSchema }), GetUserById);

export default UserRouter;