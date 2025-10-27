import { addItem, deleteItem, getCart, updateItem } from "../services/cart.js";
import { successResponse } from "../utils/response.js";

export const getCartByUserId = async (req, res, next) => {
    try {
        const cart = await getCart(req.user.id);

        return successResponse(res, "Cart fetched successfully", { cart }, 200);
    } catch (error) {
        next(error);
    }
}

export const addItemToCart = async (req, res, next) => {
    try {
        const cartItemCount = await addItem(req.body);

        return successResponse(res, "Added to cart", { cartItemCount }, 200);
    } catch (error) {
        next(error);
    }
}

export const updateItemInCart = async (req, res, next) => {
    try {
        const updatedItem = await updateItem(req.body);
        return successResponse(res, "Item updated successfully", { updatedItem }, 200);
    } catch (error) {
        next(error);
    }
}

export const deleteItemInCart = async (req, res, next) => {
    try {
        const deletedItem = await deleteItem(req.body);
        return successResponse(res, "Item deleted successfully", { deletedItem }, 200);
    } catch(error) {
        next(error);
    }
}