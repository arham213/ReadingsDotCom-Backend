import { Address, User } from "../models/index.js";

export const getAddressesByUserId = async (userId) => {
    const addresses = await Address.find({ userId: userId });

    if (!addresses) throw new Error("Addresses not found.");
    
    return addresses;
}

export const getAddressById = async (addressId, userId) => {
  const address = await Address.findOne({ _id: addressId, userId: userId });

  if (!address) throw new Error("Address not found or unauthorized");

  return address;
}

export const createAddress = async (userId, addressData) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  const newAddress = await Address.create({ ...addressData, userId });

  await User.findByIdAndUpdate( 
    userId,
    { $addToSet: { addresses: newAddress._id } } )

  return await Address.find({ userId: userId });
};

export const updateAddress = async (addressId, userId, addressData) => {
    const updatedAddress = await Address.findOneAndUpdate({ _id: addressId, userId: userId}, addressData, { new: true, runValidators: true});

    if (!updatedAddress) throw new Error("Address not found or unauthorized");

    return await Address.find({ userId: updatedAddress.userId });
}

export const deleteAddress = async (addressId, userId) => {
    const address = await Address.findOne({ _id: addressId, userId: userId});

    if (!address) throw new Error("Address not found or unauthorized");

    await address.deleteOne();

    await User.findByIdAndUpdate(
        address.userId, 
        { $pull: { addresses: address._id } }
      )

    return await Address.find({ userId: address.userId });
}