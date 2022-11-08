const express = require("express");
const books = require("./models/books");

const app = express();

// Add a GET handler on the "/books" route that responds with the collection of
// books in an `application/json` response body.
app.get("/books", (req, resp) => {
    resp.json(books);
});

// Add a GET handler on the "/books/:isbn" route that responds with a single
// book in an `application/json` response body. If the book is not found,
// respond with the Not Found status.
app.get("/books/:isbn", (req, resp) => {
    const wantedIsbn = req.params.isbn;
    for (let book of books) {
        if (book.isbn === wantedIsbn) {
            resp.json(book);
        }
    }
    resp.sendStatus(404);
});

module.exports = app;
