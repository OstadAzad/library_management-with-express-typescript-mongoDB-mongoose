import express from "express";
import { createBorrow, getBorrowSummary } from "./borrow.controller";


const router = express.Router();

router.post('/', createBorrow);
router.get('/', getBorrowSummary);

export default router;

