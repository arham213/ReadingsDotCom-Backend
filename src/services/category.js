import { Category } from "../models/index.js";
import { AppError } from "../utils/AppError.js";

export const getAllCategories = async () => {
    const categories = await Category.find();

    return categories;
}

export const getCategoryById = async (categoryId) => {
    const category = await Category.findById(categoryId);

    if (!category) throw new AppError("Category not found", 404);

    return category;
}

export const createCategory = async (categoryData) => {
    const category = await Category.findOne({ code: categoryData.code });
    
    if (category) throw new AppError("Category with this code already exists", 409);

    const newCategory = await Category.create(categoryData);

    return newCategory;
}

export const updateCategory = async (categoryId, categoryData) => {
    if (categoryData.name) {
        const categoryBeingEdited = await Category.findById(categoryId);

        if (!categoryBeingEdited) throw new AppError("Category not found", 404);

        const category = await Category.findOne({ code: categoryData.code });

        if ((categoryBeingEdited.code !== categoryData.code) && category) throw new AppError("Category with this code already exists.", 409);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        categoryData,
        { new: true, runValidators: true }
    )

    if (!updatedCategory) throw new AppError("Category not found", 404);

    return updatedCategory;
}

export const deleteCategory = async (categoryId) => {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) throw new AppError("Category not found", 404);

    return deletedCategory;
}