import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../services/category.js";
import { successResponse } from "../utils/response.js";

export const GetAllCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    return successResponse(res, "Categories fetched successfully", { categories }, 200);
  } catch (error) {
    next(error);
  }
};

export const GetCategoryById = async (req, res, next) => {
  try {
    const category = await getCategoryById(req.params.categoryId);
    return successResponse(res, "Category fetched successfully", { category }, 200);
  } catch (error) {
    next(error);
  }
};

export const CreateCategory = async (req, res, next) => {
  try {
    const category = await createCategory(req.body);
    return successResponse(res, "Category created successfully", { category }, 201);
  } catch (error) {
    next(error);
  }
};

export const UpdateCategory = async (req, res, next) => {
  try {
    const category = await updateCategory(
      req.params.categoryId,
      req.body
    );
    return successResponse(res, "Category updated successfully", { category }, 200);
  } catch (error) {
    next(error);
  }
};

export const DeleteCategory = async (req, res, next) => {
  try {
    const category = await deleteCategory(req.params.categoryId);
    return successResponse(res, "Category deleted successfully", { category }, 200);
  } catch (error) {
    next(error);
  }
};