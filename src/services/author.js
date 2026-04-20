import { Author } from "../models/index.js";
import { AppError } from "../utils/AppError.js";

export const getAllAuthors = async () => {
    const authors = await Author.find();

    return authors;
}

export const getAuthorById = async (authorId) => {
    const author = await Author.findById(authorId);

    if (!author) throw new AppError("Author not found", 404);

    return author;
}

export const createAuthor = async (authorData) => {
    const author = await Author.findOne({ name: authorData.name });
    
    if (author) throw new AppError("Author already exists", 409);

    const newAuthor = await Author.create(authorData);

    return newAuthor;
}

export const updateAuthor = async (authorId, authorData) => {
    const updatedAuthor = await Author.findByIdAndUpdate(
        authorId,
        authorData,
        { new: true, runValidators: true }
    )

    if (!updatedAuthor) throw new AppError("Author not found", 404);

    return updatedAuthor;
}

export const deleteAuthor = async (authorId) => {
    const deletedAuthor = await Author.findByIdAndDelete(authorId);

    if (!deletedAuthor) throw new AppError("Author not found", 404);

    return deletedAuthor;
}