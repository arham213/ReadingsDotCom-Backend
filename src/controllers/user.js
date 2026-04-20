import { createUser, loginUser, getUserById } from "../services/user.js";
import { failureResponseWithData, successResponse } from "../utils/response.js";

export const Signup = async (req, res, next) => {
  try {
    const userData = req.body;

    const user = await createUser(userData);

    return successResponse(res, 'Account created successfully', { userId: user._id }, 200);
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const userData = req.body;

    const response = await loginUser(userData);

    const data = {
      user: {
        id: response.user._id,
        name: response.user.fname,
        email: response.user.email,
        token: response.token
      }
    }

    return successResponse(res, "User logged in successfully", data, 200);
  } catch (error) {
    next(error);
  }
}

export const GetUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await getUserById(userId);

    return successResponse(res, "User fetched successfully", { user: user }, 200);
  } catch (error) {
    next(error);
  }
}