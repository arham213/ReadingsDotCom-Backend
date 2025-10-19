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
    const authors = await getAllAuthors(req.user.role);
    return successResponse(res, "Authors fetched successfully", { authors });
  } catch (error) {
    next(error);
  }
};

export const GetAuthorById = async (req, res, next) => {
  try {
    const author = await getAuthorById(req.user.role, req.params.authorId);
    return successResponse(res, "Author fetched successfully", { author });
  } catch (error) {
    next(error);
  }
};

export const CreateAuthor = async (req, res, next) => {
  try {
    const author = await createAuthor(req.user.role, req.body);
    return successResponse(res, "Author created successfully", { author }, 201);
  } catch (error) {
    next(error);
  }
};

export const UpdateAuthor = async (req, res, next) => {
  try {
    const updatedAuthor = await updateAuthor(
      req.user.role,
      req.params.authorId,
      req.body
    );
    return successResponse(res, "Author updated successfully", { author: updatedAuthor });
  } catch (error) {
    next(error);
  }
};

export const DeleteAuthor = async (req, res, next) => {
  try {
    const deletedAuthor = await deleteAuthor(req.user.role, req.params.authorId);
    return successResponse(res, "Author deleted successfully", { author: deletedAuthor });
  } catch (error) {
    next(error);
  }
};