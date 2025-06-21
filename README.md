# 📚 Library Management API

A **Library Management System API** built with **Express**, **TypeScript**, and **MongoDB (Mongoose)** to manage books and borrowing operations with proper validation, business logic, and aggregation.

---

## Features

- **CRUD operations** for books with validation and genre filtering
- Business logic enforcement on borrowing (copies availability)
- Book availability updated automatically based on copies
- Use of **Mongoose instance methods**, **static methods**, and **middleware**
- Aggregation pipeline to provide borrowed books summary
- Robust error handling with clear error responses
- Filtering, sorting, and pagination support on books list

---

## Technology Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (via Mongoose)

---

API Endpoints
Method	Endpoint	Description
POST	/api/books	Create a new book
GET	/api/books	Get all books (filter, sort, limit supported)
GET	/api/books/:id	Get a single book by ID
PUT	/api/books/:id	Update a book by ID
DELETE	/api/books/:id	Delete a book by ID
POST	/api/borrow	Borrow book(s)
GET	/api/borrow	Get borrowed books summary


Query Parameters for /api/books
filter: Filter books by genre (e.g., FICTION, SCIENCE, FANTASY)

sortBy: Field to sort by (default: createdAt)

sort: Sort direction asc or desc (default: desc)

limit: Number of books to return (default: 10)
Example:
GET /api/books?filter=SCIENCE&sortBy=title&sort=asc&limit=5

Sample Request Body
Create Book (POST /api/books)
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}

Borrow Book (POST /api/borrow)
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

Response Structure
Success response example:
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}
Error response example:
{
  "message": "Validation failed",
  "success": false,
  "error": { ... }
}

Business Logic Highlights
Borrowing books verifies if requested quantity is available

Copies of the book are deducted accordingly

When copies reach 0, available flag is set to false automatically

Book availability updated through Mongoose instance method and middleware

Borrow records are saved with reference to book, quantity, and due date

Aggregation Endpoint
GET /api/borrow returns a summary of total borrowed quantity per book with:

Book title

Book ISBN

Total quantity borrowed

Video Explanation
Coming soon — a short video explaining key features, API endpoints, and business logic.

Contribution
Feel free to fork the project, open issues, or submit pull requests.

A K Azad
contact: 01814-868644
email: azads5390@gmail.com
date: 21-06-25
Don't waste paper. Save the tree.
