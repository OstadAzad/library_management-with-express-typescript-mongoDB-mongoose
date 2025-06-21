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
exports.getBorrowSummary = exports.createBorrow = void 0;
const borrow_model_1 = require("./borrow.model");
//Create a borrow
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        // Business Logic
        yield borrow_model_1.Borrow.createBorrow(book, quantity); // Static method call
        const borrow = new borrow_model_1.Borrow({ book, quantity, dueDate });
        yield borrow.save();
        res.status(201).json({ "success": true, "message": "Book borrowed successfully", "data": borrow });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "borrow failed", error: error });
    }
});
exports.createBorrow = createBorrow;
const getBorrowSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowSummary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookDetails',
                },
            },
            {
                $unwind: '$bookDetails',
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$bookDetails.title',
                        isbn: '$bookDetails.isbn',
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({ "success": true, "message": "Borrowed books summary retrieved successfully", "data": borrowSummary });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to retrieve summary", error: error });
    }
});
exports.getBorrowSummary = getBorrowSummary;
