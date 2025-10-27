import { Cart } from "../models/index.js";
import { AppError } from "../utils/AppError.js";

export const createCart = async (userId) => {
    const cart = new Cart({
        userId: userId
    })

    return await cart.save();
}

export const getMinimalCart = async (userId) => {
    return await Cart.findOne({userId: userId});
}

export const getCart = async (userId) => {
    const cart = await Cart.findOne({ userId })
    .populate({
        path: "cartItems.bookId",
        populate: [
            {
                path: "publisher",
                select: "_id name",
            },
            {
                path: "authors",
                select: "_id name"
            },
            {
                path: "categories",
                select: "_id code name"
            }
        ]
    })

    return cart;
}

export const addItem = async (bookData) => {
    const cart = await Cart.findById(bookData.cartId);

    if (!cart) throw new AppError("Cart not found", 404);

    const existingBook = cart.cartItems.find(cartItem => cartItem.bookId.toString() === bookData.bookId.toString());

    if (existingBook) {
        existingBook.quantity += bookData.quantity;
        existingBook.totalPrice += bookData.price * bookData.quantity;
    } else {
        cart.cartItems.push({
            bookId: bookData.bookId,
            quantity: bookData.quantity,
            totalPrice: bookData.price * bookData.quantity
        })
    }

    await cart.save();

    return cart.itemCount;
}

export const updateItem = async (bookData) => { // make it a decrement
    const cart = await Cart.findById(bookData.cartId);

    if (!cart) throw new AppError("Cart not found", 404);

    const existingBook = cart.cartItems.find(cartItem => cartItem.bookId.toString() === bookData.bookId.toString());

    existingBook.quantity += bookData.quantity;
    existingBook.totalPrice += bookData.price * bookData.quantity;

    await cart.save();

    return existingBook;
}

export const deleteItem = async (bookData) => {
    const cart = await Cart.findById(bookData.cartId);

    if (!cart) throw new AppError("Cart not found", 404);

    const book = cart.cartItems.find(cartItem => cartItem.bookId.toString() === bookData.bookId.toString());

    if (!book) throw new AppError("Book not found", 404);

    const filteredItems = cart.cartItems.filter(cartItem => cartItem.bookId.toString() !== book.bookId.toString());

    cart.cartItems = filteredItems;

    await cart.save();

    return book;
}

//clear cart api