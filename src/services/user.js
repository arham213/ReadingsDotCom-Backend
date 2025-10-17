import { User } from "../models/index.js";
import { Book } from "../models/index.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { OTPGenerator, verifyOTP } from "../utils/OTP.js";
import { sendEmail } from "../utils/emailServer.js";

export const createUser = async (userData) => {
  const userExists = await User.findOne({ email: userData.email })

  if (userExists) {
    throw new Error("User with this email already exists");
  }

  const code = OTPGenerator();
  const OTP = {
    code: code,
  };

  const user = await User.create({...userData, OTP});

  await sendEmail(userData.email, 'Email Verification', `Please verify your email\nYour OTP is: ${code}`);

  return user._id;
};

export const verifyEmail = async (userData) => {
    const user = await User.findOne({_id: userData.userId});

    if (!user) {
        throw new Error("User with this Id does not exists")
    }

    if (user.isEmailVerified) {
        throw new Error("User email is already verified");
    }

    await verifyOTP(userData.OTP, user.OTP);

    user.isEmailVerified = true;

    await user.save();

    return user._id;
}

export const loginUser = async (userData) => {
    const user = await User.findOne({email: userData.email});

    if (!user) {
        throw new Error("User not found");
    }

    if (!user.isEmailVerified) {
        throw new Error("Email not verified. Verify the email first");
    }

    const isPasswordCorrect = await bcrypt.compare(userData.password, user.password);

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken(user);

    await user.populate(["addresses", "wishlistItems"]);

    const { password, ...userWithoutPasssword} = user.toObject();

    return [userWithoutPasssword, token];
}

export const editUser = async (userId, userData) => {
  const user = await User.findByIdAndUpdate(
    userId, 
    userData, 
    {new: true}
  )
  .select("-password")
  .populate("addresses")
  .populate("wishlistItems");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const addToWishList = async (data) => {
  const bookExists = await Book.exists({ _id: data.bookId });

  if (!bookExists) {
    throw new Error("Book not found");
  }
  
  const user = await User.findByIdAndUpdate(
    data.userId,
    { $addToSet: { wishlistItems: data.bookId } }, // prevents duplicates automatically
    { new: true }
  )
  .populate("addresses")
  .populate("wishlistItems")
  .lean()

  if (!user) {
    throw new Error("User not found");
  }

  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

export const removeFromWishlist = async (userId, bookId) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { wishlistItems: bookId } },
        { new: true, runValidators: true }
    )
    .populate("addresses")
    .populate("wishlistItems")
    .lean();


    if (!user) {
        throw new Error("User not found");
    }

    const { password, ...userWithoutPasssword} = user;

    return userWithoutPasssword;
}

