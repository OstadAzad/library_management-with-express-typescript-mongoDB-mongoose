import { Request, Response } from "express";
import { Borrow } from "./borrow.model";

//Create a borrow
export const createBorrow = async (req: Request, res: Response) => {
    try {
        const { book, quantity, dueDate } = req.body;
        // Business Logic
        await Borrow.createBorrow(book, quantity); // Static method call

        const borrow = new Borrow({ book, quantity, dueDate });
        await borrow.save();
        res.status(201).json({ "success": true, "message": "Book borrowed successfully", "data": borrow })
    } catch (error) {
        res.status(400).json({ success: false, message: "borrow failed", error: error })
    }
}

export const getBorrowSummary = async (req: Request, res: Response) => {
    try {
        const borrowSummary = await Borrow.aggregate([
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
        res.status(200).json({ "success": true, "message": "Borrowed books summary retrieved successfully", "data": borrowSummary })
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to retrieve summary", error: error })
    }
}