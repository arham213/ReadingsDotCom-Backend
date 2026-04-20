import { Address, User } from "../models/index.js";
import { AppError } from "../utils/AppError.js";

export const getAddressesByUserId = async (userId) => {
    const addresses = await Address.find({ userId: userId });
    
    return addresses;
}

export const getAddressById = async (addressId, userId) => {
  const address = await Address.findOne({ _id: addressId, userId: userId });

  if (!address) throw new AppError("Address not found or unauthorized", 404);

  return address;
}

export const createAddress = async (userId, addressData) => {
  const user = await User.findById(userId);

  if (!user) throw new AppError("User not found", 404);

  const newAddress = await Address.create({ ...addressData, userId });

  await User.findByIdAndUpdate( 
    userId,
    { $addToSet: { addresses: newAddress._id } } 
  )

  return newAddress;
};

export const updateAddress = async (addressId, userId, addressData) => {
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId: userId}, 
      addressData, 
      { new: true, runValidators: true}
    );

    if (!updatedAddress) throw new AppError("Address not found or unauthorized", 404);

    return updatedAddress;
}

export const deleteAddress = async (addressId, userId) => {
    const address = await Address.findOne({ _id: addressId, userId: userId});

    if (!address) throw new AppError("Address not found or unauthorized", 404);

    await address.deleteOne();

    await User.findByIdAndUpdate(
        address.userId, 
        { $pull: { addresses: address._id } }
      )

    return address;
}