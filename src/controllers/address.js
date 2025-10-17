import { getAddressesByUserId, createAddress, updateAddress, deleteAddress } from "../services/address.js";
import { successResponse } from "../utils/response.js";

export const GetAddressesByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const addresses = await getAddressesByUserId(userId);

        return successResponse(res, "Addresses fetched successfully", {addresses: addresses}, 200);
    } catch (error) {
        next(error);
    }
}

export const CreateAddress = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const addressData = req.body;

        const updatedUser = await createAddress(userId, addressData);

        return successResponse(res, "Address created successfully", {user: updatedUser}, 200);
    } catch (error) {
        next(error);
    }
}

export const UpdateAddress = async (req, res, next) => {
    try {
        const addressId = req.params.addressId;

        const addressData = req.body;

        const updatedUser = await updateAddress(addressId, addressData);

        return successResponse(res, "Address updated successfully", {user: updatedUser}, 200);
    } catch (error) {
        next(error);
    }
}

export const DeleteAddress = async (req, res, next) => {
    try {
        const addressId = req.params.addressId;

        const updatedUser = await deleteAddress(addressId);

        return successResponse(res, "Address deleted successfully", {user: updatedUser}, 200);
    } catch (error) {
        next(error);
    }
}