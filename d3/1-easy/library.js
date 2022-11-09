const express = require("express");
const { Book } = require("./models/book");

const app = express();

// Add a GET handler on the "/books" route that responds with the collection of
// books in an `application/json` response body.
app.get("/books", async (req, resp) => {
    resp.json(await Book.findAll());
});

// Add a GET handler on the "/books/:isbn" route that responds with a single
// book in an `application/json` response body. If the book is not found,
// respond with the Not Found status.
app.get("/books/:isbn", async (req, resp) => {
    const book = await Book.findOne({where: {isbn: req.params.isbn}});
    console.log(book)
    if (book === null) {
        resp.sendStatus(404);
        return;
    }
    console.log(book.toJSON());
    resp.json(book.toJSON());
});

module.exports = app;
