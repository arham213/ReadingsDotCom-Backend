import { z } from "zod";

export const createAddressSchema = z.object({
  userId: z.string().min(1, "userId is required").regex(/^[0-9a-fA-F]{24}$/, "Invalid userId format"),
  address: z.string().min(1, "Address is required"),
  country: z.string().optional(),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().optional(),
  contactNo: z.string().regex(/^[0-9]{10,15}$/, "Contact number must be between 10–15 digits")
});

export const updateAddressSchema = createAddressSchema.partial();
