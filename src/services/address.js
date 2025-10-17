import { Address, User } from "../models/index.js";

export const getAddressesByUserId = async (userId) => {
    return await Address.find({ userId: userId });
}

export const createAddress = async (userId, addressData) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const newAddress = await Address.create({ ...addressData, userId });

  const updatedUser = await User.findByIdAndUpdate( 
    userId,
    { $addToSet: { addresses: newAddress._id } }, 
    { new: true, runValidators: true } )
    .populate('addresses') 
    .populate('wishlistItems')
    .lean();

  const { password, ...userWithoutPassword } = updatedUser;

  return userWithoutPassword;
};

export const updateAddress = async (addressId, addressData) => {
    const address = await Address.findByIdAndUpdate(addressId, addressData, { new: true });

    const updatedUser = await User.findById(
        address.userId
    )
    .populate("addresses")
    .populate("wishlistItems")
    .lean();

    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
}

export const deleteAddress = async (addressId) => {
    const address = await Address.findById(addressId);

    if (!address) {
        throw new Error("Address not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
        address.userId, 
        { $pull: { addresses: address._id } }, 
        { new: true }
      )
      .populate("addresses")
      .populate("wishlistItems")
      .lean()
    
    await address.deleteOne();

    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
}