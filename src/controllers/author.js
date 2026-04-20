import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
} from "../services/author.js";
import { successResponse } from "../utils/response.js";

export const GetAllAuthors = async (req, res, next) => {
  try {
    const authors = await getAllAuthors();
    return successResponse(res, "Authors fetched successfully", { authors }, 200);
  } catch (error) {
    next(error);
  }
};

export const GetAuthorById = async (req, res, next) => {
  try {
    const author = await getAuthorById(req.params.authorId);
    return successResponse(res, "Author fetched successfully", { author }, 200);
  } catch (error) {
    next(error);
  }
};

export const CreateAuthor = async (req, res, next) => {
  try {
    const author = await createAuthor(req.body);
    return successResponse(res, "Author created successfully", { author }, 201);
  } catch (error) {
    next(error);
  }
};

export const UpdateAuthor = async (req, res, next) => {
  try {
    const author = await updateAuthor(
      req.params.authorId,
      req.body
    );
    return successResponse(res, "Author updated successfully", { author }, 200);
  } catch (error) {
    next(error);
  }
};

export const DeleteAuthor = async (req, res, next) => {
  try {
    const author = await deleteAuthor(req.params.authorId);
    return successResponse(res, "Author deleted successfully", { author }, 200);
  } catch (error) {
    next(error);
  }
};