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
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("../book/book.model");
//Create a borrow Schema
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Book' },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true }
}, {
    timestamps: true,
    versionKey: false
});
// Static Method: Book quantity update logic
borrowSchema.statics.borrowBook = function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.Book.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        if (book.copies < quantity) {
            throw new Error('Not enough copies available');
        }
        book.copies -= quantity;
        book.available = book.copies > 0;
        yield book.save();
    });
};
//Pre Hook: We can add log or check before save
borrowSchema.pre('save', function (next) {
    console.log('📚 Borrow record being saved...');
    next();
});
exports.Borrow = (0, mongoose_1.model)('Borrow', borrowSchema);
