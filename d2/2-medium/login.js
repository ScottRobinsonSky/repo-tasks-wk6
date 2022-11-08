const express = require("express");

const app = express();

// Form data is URL encoded
app.use(express.urlencoded({ extended: false }));

// Add a POST handler on the "/login" route that expects a body with both a
// `username` and `password` field.
//
// - If either the `username` or `password` is missing from the request body,
//   send a Bad Request status in response.
//
// - If `username` is `alice` and password is `s3cr3t`, send a redirect to "/"
//   in response.
//
// - Otherwise, send an Unauthorized status in reponse.
app.post("/login", (req, resp) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === undefined || password === undefined) {
        resp.sendStatus(400);
    }

    if (username === "alice" && password === "s3cr3t") {
        resp.redirect("/");
    }

    resp.sendStatus(401);
});

module.exports = app;
