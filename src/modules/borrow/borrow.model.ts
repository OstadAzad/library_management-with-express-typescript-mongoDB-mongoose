import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";
import { Book } from "../book/book.model";

//Create a borrow Schema
const borrowSchema = new Schema<IBorrow>({
    book: { type: Schema.Types.ObjectId, required: true, ref: 'Book' },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true }
}, {
    timestamps: true,
    versionKey: false
})

// Static Method: Book quantity update logic
borrowSchema.statics.createBorrow = async function (bookId: string, quantity: number) {
    const book = await Book.findById(bookId);

    if (!book) {
        throw new Error('Book not found');
    }

    if (book.copies < quantity) {
        throw new Error('Not enough copies available');
    }

    book.copies -= quantity;
    book.available = book.copies > 0;
    await book.save();
};

//Pre Hook: We can add log or check before save
borrowSchema.pre('save', function (next) {
    console.log('📚 Borrow record being saved...');
    next();
});

export const Borrow = model<IBorrow, any>('Borrow', borrowSchema);