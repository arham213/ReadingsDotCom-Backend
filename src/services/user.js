import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import { generateToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";

export const createUser = async (userData) => {
  const user = await User.findOne({ email: userData.email })

  if (user) throw new AppError("Account with this email already exists. Please Login.", 409);

  const newUser = await User.create({ ...userData });

  return newUser;
};

export const loginUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) throw new AppError("Invalid email or password.", 401);

  const isPasswordCorrect = await bcrypt.compare(userData.password, user.password);

  if (!isPasswordCorrect) throw new AppError("Invalid email or password.", 401);

  const token = generateToken(user);

  return { user: user, token: token };
}

export const getUserById = async (userId) => {
  const user = await User.findById(userId)
    .select("-password");

  if (!user) throw new AppError("User not found", 404);

  return user;
}