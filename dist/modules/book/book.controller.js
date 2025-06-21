"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("./book.model");
//Create a Book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new book_model_1.Book(req.body);
        yield book.save();
        res.status(201).json({ "success": true, "message": "Book created successfully", "data": book });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "validation failed", error: error });
    }
});
exports.createBook = createBook;
//Get all books with filter, sort and limit
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10 } = req.query;
        const query = filter ? { genre: filter } : {};
        const books = yield book_model_1.Book.find(query).sort({ [sortBy]: sort === 'asc' ? 1 : -1 }).limit(Number(limit));
        res.status(200).json({ "success": true, "message": "Books retrieved successfully", "data": books });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error });
    }
});
exports.getAllBooks = getAllBooks;
//Get Book by ID
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findById(req.params.bookId);
        if (!book) {
            res.status(404).json({ success: false, message: "book not found" });
            return;
        }
        res.status(200).json({ "success": true, "message": "Books retrieved successfully", "data": book });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Invalid ID", error: error });
    }
});
exports.getBookById = getBookById;
//Update book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        if (!updatedBook) {
            res.status(404).json({ success: false, message: "book not found" });
            return;
        }
        res.status(200).json({ "success": true, "message": "Book updated successfully", "data": updatedBook });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Update failed", error: error });
    }
});
exports.updateBook = updateBook;
//Delete book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBook = yield book_model_1.Book.findByIdAndDelete(req.params.bookId);
        if (!deletedBook) {
            res.status(404).json({ success: false, message: "book not found" });
            return;
        }
        res.status(200).json({ "success": true, "message": "Book deleted successfully", "data": null });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Delete failed", error: error });
    }
});
exports.deleteBook = deleteBook;
