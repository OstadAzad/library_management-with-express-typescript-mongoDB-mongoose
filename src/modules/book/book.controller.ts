import { Request, Response } from "express";
import { Book } from "./book.model";

//Create a Book
export const createBook = async (req: Request, res: Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({ "success": true, "message": "Book created successfully", "data": book })
    } catch (error) {
        res.status(400).json({ success: false, message: "validation failed", error: error })
    }
}

//Get all books with filter, sort and limit
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10 } = req.query;
        const query: any = filter ? { genre: filter } : {};

        const books = await Book.find(query).sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 }).limit(Number(limit));
        res.status(200).json({ "success": true, "message": "Books retrieved successfully", "data": books })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error })
    }
}

//Get Book by ID
export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) { res.status(404).json({ success: false, message: "book not found" }); return; }
        res.status(200).json({ "success": true, "message": "Books retrieved successfully", "data": book })
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid ID", error: error })
    }
}

//Update book
export const updateBook = async (req: Request, res: Response) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        if (!updatedBook) { res.status(404).json({ success: false, message: "book not found" }); return; }
        res.status(200).json({ "success": true, "message": "Book updated successfully", "data": updatedBook })
    } catch (error) {
        res.status(400).json({ success: false, message: "Update failed", error: error })
    }
}

//Delete book
export const deleteBook = async (req: Request, res: Response) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.bookId)
        if (!deletedBook) { res.status(404).json({ success: false, message: "book not found" }); return; }
        res.status(200).json({ "success": true, "message": "Book deleted successfully", "data": null })
    } catch (error) {
        res.status(400).json({ success: false, message: "Delete failed", error: error })
    }
}