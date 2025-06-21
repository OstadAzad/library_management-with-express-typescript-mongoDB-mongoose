import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "./book.controller";
import express from "express";


const router = express.Router();

router.post('/', createBook);
router.get('/', getAllBooks);
router.get('/:bookId', getBookById);
router.put('/:bookId', updateBook);
router.delete('/:bookId', deleteBook);

export default router;