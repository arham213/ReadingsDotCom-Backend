import {z} from "zod";

export const signupSchema = z.object({
    name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name cannot exceed 50 characters'),

    email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),

    password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password is too long'),
}).strict();

export const verifyEmailSchema = z.object({
    userId: z
    .string()
    .min(1, "userId is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid userId format"),

    OTP: z
    .string()
    .min(6, "OTP is required and should be of 6 digits")
    .max(6)
}).strict()

export const loginSchema = z.object({
    email: z
    .string()
    .min(1, "Email is required"),

    password: z
    .string()
    .min(1, "Password is required")
}).strict()

export const resetPasswordSchema = z.object({
    newPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password is too long'),

    OTP: z
    .string()
    .min(6, "OTP is required and should be of 6 digits")
    .max(6)
}).strict()

export const editUserSchema = z.object({
  fname: z
    .string()
    .min(1, "First name cannot be empty")
    .max(50, "First name cannot exceed 50 characters")
    .optional(),

  lname: z
    .string()
    .min(1, "Last name cannot be empty")
    .max(50, "Last name cannot exceed 50 characters")
    .optional(),

  contactNo: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Contact number must be between 10 to 15 digits")
    .optional(),
}).strict();

export const objectIdParamsSchema = z.object({
    userId: z
    .string()
    .min(1, "userId is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid userId format")
}).strict()

export const addToWishListSchema = z.object({
    bookId: z
    .string()
    .min(1, "bookId is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid bookId format")
}).strict();

export const removeFromWishListSchema = z.object({
    bookId: z
    .string()
    .min(1, "bookId is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid bookId format")
}).strict();