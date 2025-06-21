import { Application, Request, Response } from "express";
import express from "express";
import bookRoutes from "./modules/book/book.route";
import borrowRoutes from "./modules/borrow/borrow.route";

const app: Application = express();

//middlewares
app.use(express.json());

//routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

//routes not found
app.use((req: Request, res: Response) => {
    res.status(404).json({ success: false, message: "Route not found" })
});

export default app;

