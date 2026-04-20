import { Book, Cart } from "../models/index.js";
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

    const book = await Book.findById(bookData.bookId);

    const existingBook = cart.cartItems?.find(cartItem => cartItem.bookId.toString() === bookData.bookId.toString());

    if (existingBook) {
        if ((existingBook.quantity + bookData.quantity) > book.inStock) {
            throw new AppError("We do not enough stock available", 404);
        }
        existingBook.quantity += bookData.quantity;
        existingBook.totalPrice += bookData.price * bookData.quantity;
    } else {
        if (bookData.quantity > book.inStock) {
            throw new AppError("We do not enough stock available", 404);
        }
        cart.cartItems.push({
            bookId: bookData.bookId,
            quantity: bookData.quantity,
            totalPrice: bookData.price * bookData.quantity
        })
    }

    await cart.save();

    return cart.itemCount;
}

export const updateItem = async (bookData) => {
    const cart = await Cart.findById(bookData.cartId);

    if (!cart) throw new AppError("Cart not found", 404);

    const book = await Book.findById(bookData.bookId);

    if (!book) throw new AppError("Book not found", 404);

    const existingBook = cart.cartItems.find(cartItem => cartItem.bookId.toString() === bookData.bookId.toString());

    if (!existingBook) throw new AppError("Book not found", 404);

    console.log('existingBook quantity:', existingBook.quantity);
    console.log('bookData quantity:', bookData.quantity);
    console.log('book stock:', book.inStock);

    if (existingBook.quantity + bookData.quantity < 0) {
        throw new AppError("Invalid quanitity");
    } else if ((existingBook.quantity + bookData.quantity) > book.inStock) {
        throw new AppError("We do not have enough stock available", 403);
    } else if (existingBook.quantity + bookData.quantity == 0) {
        const filteredItems = cart.cartItems.filter(cartItem => cartItem.bookId != bookData.bookId);
        cart.cartItems = filteredItems;
    } else {
        existingBook.quantity += bookData.quantity;
        existingBook.totalPrice += bookData.price * bookData.quantity;
    }

    await cart.save();

    return cart.itemCount;
}

export const deleteItem = async (bookData) => {
    const cart = await Cart.findById(bookData.cartId);

    if (!cart) throw new AppError("Cart not found", 404);

    const book = cart.cartItems.find(cartItem => cartItem.bookId.toString() === bookData.bookId.toString());

    if (!book) throw new AppError("Book not found", 404);

    const filteredItems = cart.cartItems.filter(cartItem => cartItem.bookId.toString() !== book.bookId.toString());

    cart.cartItems = filteredItems;

    await cart.save();

    return cart.itemCount;
}

export const deleteAllItems = async (cartId) => {
    const cart = await Cart.findById(cartId);

    cart.cartItems = [];
    cart.itemCount = 0;
    cart.totalQuantity = 0;
    cart.subTotal = 0;

    await cart.save();
}