"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = __importDefault(require("./modules/book/book.route"));
const borrow_route_1 = __importDefault(require("./modules/borrow/borrow.route"));
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
//routes
app.use("/api/books", book_route_1.default);
app.use("/api/borrow", borrow_route_1.default);
//routes not found
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});
exports.default = app;
