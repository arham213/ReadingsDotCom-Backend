import {
    advancedBookSearch,
    createBook,
    deleteBook,
    getAllBooks,
    getBookById,
    getBooksByAuthor,
    getBooksByCategory,
    searchBooks,
    updateBook,
  } from "../services/book.js";
  import { successResponse } from "../utils/response.js";

  export const SearchBooks = async (req, res, next) => {
    try {
        const books = await searchBooks(req.query.searchString?.trim() || "");
        return successResponse(res, "Books fetched successfully", { books }, 200);
    } catch (error) {
        next(error);
    }
  }

  export const AdvancedBookSearch = async (req, res, next) => {
    try {
      const books = await advancedBookSearch(req.query);
      return successResponse(res, "Books fetched successfully", { books }, 200);
    } catch (error) {
      next(error);
    }
  }
  
  export const GetAllBooks = async (req, res, next) => {
    try {
      const books = await getAllBooks();
      return successResponse(res, "Books fetched successfully", { books }, 200);
    } catch (error) {
      next(error);
    }
  };

  export const GetBooksByCategory = async (req, res, next) => {
    console.log('Category Code:', req.params.categoryCode);
    try {
        const books = await getBooksByCategory(req.params.categoryCode);
        return successResponse(res, "Books fetched succesfully", { books }, 200);
    } catch (error) {
        next(error);
    }
  }

  export const GetBooksByAuthor = async (req, res, next) => {
    console.log('Author Id:', req.params.authorId);
    try {
        const books = await getBooksByAuthor(req.params.authorId);
        return successResponse(res, "Books fetched succesfully", { books }, 200);
    } catch (error) {
        next(error);
    }
  }
  
  export const GetBookById = async (req, res, next) => {
    try {
      console.log('salam before')
      const book = await getBookById(req.params.bookId);
      console.log('salam after')
      return successResponse(res, "Book fetched successfully", { book }, 200);
    } catch (error) {
      next(error);
    }
  };
  
  export const CreateBook = async (req, res, next) => {
    try {
      const book = await createBook(req.body);
      return successResponse(res, "Book created successfully", { book }, 201);
    } catch (error) {
      next(error);
    }
  };
  
  export const UpdateBook = async (req, res, next) => {
    try {
      const book = await updateBook(
        req.params.bookId,
        req.body
      );
      return successResponse(res, "Book updated successfully", { book }, 200);
    } catch (error) {
      next(error);
    }
  };
  
  export const DeleteBook = async (req, res, next) => {
    try {
      const book = await deleteBook(req.params.bookId);
      return successResponse(res, "Book deleted successfully", { book }, 200);
    } catch (error) {
      next(error);
    }
  };