import {
  createBookRequest,
  deleteBookRequest,
  getAllBookRequests,
  getBookRequestById,
  updateBookRequest,
} from "../services/bookRequest.js";
import { successResponse } from "../utils/response.js";

export const GetAllBookRequests = async (req, res, next) => {
  try {
    const bookRequests = await getAllBookRequests();
    return successResponse(res, "BookRequests fetched successfully", { bookRequests }, 200);
  } catch (error) {
    next(error);
  }
};

export const GetBookRequestById = async (req, res, next) => {
  try {
    const bookRequest = await getBookRequestById(req.params.bookRequestId);
    return successResponse(res, "BookRequest fetched successfully", { bookRequest }, 200);
  } catch (error) {
    next(error);
  }
};

export const CreateBookRequest = async (req, res, next) => {
  try {
    const bookRequest = await createBookRequest(req.body);
    return successResponse(res, "BookRequest created successfully", { bookRequest }, 201);
  } catch (error) {
    next(error);
  }
};

export const UpdateBookRequest = async (req, res, next) => {
  try {
    const bookRequest = await updateBookRequest(
      req.params.bookRequestId,
      req.body
    );
    return successResponse(res, "BookRequest updated successfully", { bookRequest }, 200);
  } catch (error) {
    next(error);
  }
};

export const DeleteBookRequest = async (req, res, next) => {
  try {
    const bookRequest = await deleteBookRequest(req.params.bookRequestId);
    return successResponse(res, "BookRequest deleted successfully", { bookRequest }, 200);
  } catch (error) {
    next(error);
  }
};