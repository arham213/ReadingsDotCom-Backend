import { Author } from "../models/index.js";

export const getAllAuthors = async (userRole) => {
    const authors = await Author.find();

    return authors;
}

export const getAuthorById = async (userRole, authorId) => {
    const author = await Author.findById(authorId);

    if (!author) throw new Error("Author not found");

    return author;
}

export const createAuthor = async (userRole, authorData) => {
    const author = await Author.findOne({ name: authorData.name });
    
    if (author) throw new Error("Author already exists");

    const newAuthor = await Author.create(authorData);

    return newAuthor;
}

export const updateAuthor = async (userRole, authorId, authorData) => {
    if (authorData.name) {
        const authorBeingEdited = await Author.findById(authorId);

        if (!authorBeingEdited) throw new Error("Author not found");

        const author = await Author.findOne({ name: authorData.name });

        if ((authorBeingEdited.name !== authorData.name) && author) throw new Error("Author with this name already exists.");
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
        authorId,
        authorData,
        { new: true, runValidators: true }
    )

    if (!updatedAuthor) throw new Error("Author not found");

    return await Author.find();
}

export const deleteAuthor = async (userRole, authorId) => {
    const author = await Author.findByIdAndDelete(authorId);

    if (!author) throw new Error("Author not found");

    return await Author.find();
}