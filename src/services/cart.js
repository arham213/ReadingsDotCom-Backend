import { Cart } from "../models/index.js";

export const createCart = async (userId) => {
    const cart = new Cart({
        userId: userId
    })

    return await cart.save();
}

export const getCart = async (userId) => {
    return await Cart.findOne({userId: userId});
}