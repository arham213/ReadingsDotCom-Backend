import { getAddressesByUserId, createAddress, updateAddress, deleteAddress, getAddressById } from "../services/address.js";
import { successResponse } from "../utils/response.js";

export const GetAddressesByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const addresses = await getAddressesByUserId(userId);

        return successResponse(res, "Addresses fetched successfully", { addresses }, 200);
    } catch (error) {
        next(error);
    }
}

export const GetAddressById = async (req, res, next) => {
    try {
        const { addressId, userId } = req.params;

        const address = await getAddressById(addressId, userId);

        return successResponse(res, "Address fetched successfully.", { address }, 200);
    } catch (error) {
        next(error);
    }
}

export const CreateAddress = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const addressData = req.body;

        const address = await createAddress(userId, addressData);

        return successResponse(res, "Address created successfully", { address }, 201);
    } catch (error) {
        next(error);
    }
}

export const UpdateAddress = async (req, res, next) => {
    try {
        const { addressId, userId } = req.params;

        const addressData = req.body;

        const address = await updateAddress(addressId, userId, addressData);

        return successResponse(res, "Address updated successfully", { address }, 200);
    } catch (error) {
        next(error);
    }
}

export const DeleteAddress = async (req, res, next) => {
    try {
        const { addressId, userId } = req.params;

        const address = await deleteAddress(addressId, userId);

        return successResponse(res, "Address deleted successfully", { address }, 200);
    } catch (error) {
        next(error);
    }
}