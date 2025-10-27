import { Book } from "../models/index.js";
import { AppError } from "../utils/AppError.js";

export const searchBooks = async (searchString) => {
    const books = await Book.aggregate([
        {
            $lookup: {
                from: "publishers",
                localField: "publisher",
                foreignField: "_id",
                as: "publisher"
            }
        },
        { $unwind: { path: "$publisher", preserveNullAndEmptyArrays: true } },

        {
            $lookup: {
                from: "authors",
                localField: "authors",
                foreignField: "_id",
                as: "authors"
            }
        },

        {
            $match: {
                $or: [
                    { title: { $regex: searchString, $options: "i" } },
                    { description: { $regex: searchString, $options: "i" } },
                    { "publisher.name": { $regex: searchString, $options: "i" } },
                    { "authors.name": { $regex: searchString, $options: "i" } },
                ]
            }
        }
    ])

    return books;
}

export const advancedBookSearch = async (searchParams) => {
    const matchConditions = [
        searchParams?.title ? { title: { $regex: searchParams.title.trim(), $options: "i" } } : null,
        searchParams?.author ? { "authors.name": { $regex: searchParams.author.trim(), $options: "i" } } : null,
        searchParams?.ISBN ? { ISBN: { $regex: searchParams?.ISBN?.trim(), $options: "i" } } : null,
        searchParams?.category ? { "categories.name": { $regex: searchParams?.category?.trim(), $options: "i" } } : null,
        searchParams?.publisher ? { "publisher.name": { $regex: searchParams?.publisher?.trim(), $options: "i" } } : null,
        searchParams?.publicationYear ? { publicationYear: Number(searchParams?.publicationYear) } : null,
        searchParams?.language ? { language: { $regex: searchParams?.language?.trim(), $options: "i" } } : null,
        searchParams?.format ? { format: { $regex: searchParams?.format?.trim(), $options: "i" } } : null,
        searchParams?.priceFrom || searchParams?.priceTo ? {
          ourPriceAfterDiscount: {
            ...(searchParams.priceFrom && { $gte: Number(searchParams.priceFrom) }),
            ...(searchParams.priceTo && { $lte: Number(searchParams.priceTo) }),
          },
        } : null,
    ].filter(Boolean);

    const books = await Book.aggregate([
        {
            $lookup: {
                from: "publishers",
                localField: "publisherId",
                foreignField: "_id",
                as: "publisher"
            }
        },
        { $unwind: { path: "$publisher", preserveNullAndEmptyArrays: true } },

        {
            $lookup: {
                from: "authors",
                localField: "authors",
                foreignField: "_id",
                as: "authors"
            }
        },

        {
            $lookup: {
                from: "categories",
                localField: "categories",
                foreignField: "_id",
                as: "categories"
            }
        },
        ...(matchConditions.length > 0 ? [{ $match: { $and: matchConditions } }] : [])
    ])

    return books;
}

export const getAllBooks = async () => {
    const books = await Book.find().populate("publisher").populate("authors").populate("categories").populate("subCategories").populate("additionalCategories");

    return books;
}

export const getBooksByCategory = async (categoryCode) => {
    const books = await Book.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "categoryIds",
                foreignField: "_id",
                as: "categories"
            }
        },
        {
            $unwind: "$categories"
        },
        {
            $match: { "categories.code": categoryCode }
        }
    ])

    return books;
}

export const getBookById = async (bookId) => {
    console.log('bookId:', bookId);
    const book = await Book.findById(bookId)

    

    if (!book) throw new AppError("Book not found", 404);

    return book;
}

export const createBook = async (bookData) => {
    const book = await Book.findOne({ ISBN: bookData.ISBN });
    
    if (book) throw new AppError("Book already exists", 409);

    const newBook = await Book.create(bookData)
    
    const populatedBook = await Book.findById(newBook._id)
        .populate("publisher")
        .populate("authors")
        .populate("categories")
        .populate("subCategories")
        .populate("additionalCategories")

    return populatedBook;
}

export const updateBook = async (bookId, bookData) => {
    const bookBeingEdited = await Book.findById(bookId);

    if (!bookBeingEdited) throw new AppError("Book not found", 404);

    if (bookData.ISBN) {
        const book = await Book.findOne({ ISBN: bookData.ISBN });

        if ((bookBeingEdited.ISBN !== bookData.ISBN) && book) throw new AppError("Book with this ISBN already exists.", 409);
    }

    Object.assign(bookBeingEdited, bookData);

    await bookBeingEdited.save();

    const updatedBook = await Book.findById(bookBeingEdited._id)
    .populate("publisher")
    .populate("authors")
    .populate("categories")
    .populate("subCategories")
    .populate("additionalCategories")

    if (!updatedBook) throw new AppError("Book not found", 404);

    return updatedBook;
}

export const deleteBook = async (bookId) => {
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) throw new AppError("Book not found", 404);

    return deletedBook;
}