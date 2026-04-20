import { BookRequest } from "../models/index.js";
import { AppError } from "../utils/AppError.js";

export const getAllBookRequests = async () => {
    const bookRequests = await BookRequest.find();

    return bookRequests;
}

export const getBookRequestById = async (bookRequestId) => {
    const bookRequest = await BookRequest.findById(bookRequestId);

    if (!bookRequest) throw new AppError("BookRequest not found", 404);

    return bookRequest;
}

export const createBookRequest = async (bookRequestData) => {
    const newBookRequest = await BookRequest.create(bookRequestData);

    return newBookRequest;
}

export const updateBookRequest = async (bookRequestId, bookRequestData) => {
    const updatedBookRequest = await BookRequest.findByIdAndUpdate(
        bookRequestId,
        bookRequestData,
        { new: true, runValidators: true }
    )

    if (!updatedBookRequest) throw new AppError("BookRequest not found", 404);

    return updatedBookRequest;
}

export const deleteBookRequest = async (bookRequestId) => {
    const deletedBookRequest = await BookRequest.findByIdAndDelete(bookRequestId);

    if (!deletedBookRequest) throw new AppError("BookRequest not found", 404);

    return deletedBookRequest;
}