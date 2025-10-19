import { createUser, verifyEmail, loginUser, editUser, addToWishList, removeFromWishlist, resendOTP, resetPassword, sendResetPasswordOTP, getUserById } from "../services/user.js";
import { createCart, getCart } from "../services/cart.js";
import { failureResponseWithData, successResponse } from "../utils/response.js";

export const Signup = async (req, res, next) => {
  try {
    const userData = req.body;

    const [userId, message] = await createUser(userData);

    if (userId && message) return successResponse(res, message, {userId: userId} , 200);

    return successResponse(res, 'Account created successfully. We have sent you a verification email please verify your email', {userId: userId} , 201);
  } catch (error) {
    next(error);
  }
};

export const ResendOTP = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    await resendOTP(userId);

    return successResponse(res, 'OTP resent successfully. Please check your email', null , 200);
  } catch (error) {
    next(error);
  }
}

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

    const response = await loginUser(userData);

    if (!response.success) {
      return failureResponseWithData(res, response.error, { userId: response.userId }, response.statusCode);
    }

    const cart = await getCart(response.user._id);

    const data = {
      user: {
        id: response.user._id,
        email: response.user.email,
      },
      cart: {
        cartItemCount: cart.itemCount,
      },
      token: response.token
    }

    return successResponse(res, "User logged in successfully", data, 200);
  } catch (error) {
    next(error);
  }
}

export const ForgotPassword = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    await sendResetPasswordOTP(userId);

    return successResponse(res, "Password reset OTP has been sent to your email.", null, 200);
  } catch (error) {
    next(error);
  }
}

export const ResetPassword = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const userData = req.body;

    await resetPassword(userData, userId);

    return successResponse(res, "Password reset successfully", null, 200);
  } catch (error) {
    next(error);
  }
}

export const GetUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await getUserById(userId);

    return successResponse(res, "User fetched successfully", {user: user}, 200);
  } catch (error) {
    next(error);
  }
}

export const EditUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

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
    const { userId, bookId } = req.params;

    const user = await addToWishList(userId, bookId);

    return successResponse(res, "Item added to the wishlist successfully", {user: user}, 200);
  } catch (error) {
    next(error);
  }
}

export const RemoveFromWishlist = async(req, res, next) => {
  try {
    const { userId, bookId } = req.params;

    const user = await removeFromWishlist(userId, bookId);

    return successResponse(res, "Item removed from the wishlist successfully", {user: user}, 200);
  } catch (error) {
    next(error);
  }
}