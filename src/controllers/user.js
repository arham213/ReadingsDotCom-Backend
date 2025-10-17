import { createUser, verifyEmail, loginUser, editUser, addToWishList, removeFromWishlist } from "../services/user.js";
import { createCart, getCart } from "../services/cart.js";
import { successResponse } from "../utils/response.js";

export const Signup = async (req, res, next) => {
  try {
    const userData = req.body;

    const userId = await createUser(userData);

    return successResponse(res, 'User registered successfully. We have sent you a verification email please verify your email', {userId: userId} , 201);
  } catch (error) {
    next(error);
  }
};

export const VerifyEmail = async (req, res, next) => {
  try {
    const userData = req.body;

    const userId = await verifyEmail(userData);

    await createCart(userId);

    return successResponse(res, 'Email verified successfully', null , 200);
  } catch (error) {
    next(error);
  }
}

export const Login = async (req, res, next) => {
  try {
    const userData = req.body;

    const [user, token] = await loginUser(userData);

    const cart = await getCart(user._id);

    return successResponse(res, "User logged in successfully", {user: user, cart: cart, jwt: token}, 200);
  } catch (error) {
    next(error);
  }
}

export const EditUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const userData = req.body;

    const user = await editUser(userId, userData);

    return successResponse(res, 'User info updated successfully', {user: user}, 200);
  } catch (error) {
    next(error);
  }
}

export const DeleteUser = async (req, res, next) => {
  
}

export const AddToWishList = async(req, res, next) => {
  try {
    const data = req.body;

    const user = await addToWishList(data);

    return successResponse(res, "Item added to the wishlist successfully", {user: user}, 200);
  } catch (error) {
    next(error);
  }
}

export const RemoveFromWishlist = async(req, res, next) => {
  try {
    const { userId, bookId} = req.params;

    const user = await removeFromWishlist(userId, bookId);

    return successResponse(res, "Item removed from the wishlist successfully", {user: user}, 200);
  } catch (error) {
    next(error);
  }
}