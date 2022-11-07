const express = require('express');

const app = express();

// Add a GET handler that always responds successfully with the route in
// uppercase, i.e., GET /hello should respond with the text body: HELLO!
app.all("*", (req, resp) => {
    if (req.method === "GET" && req.path != "/") {
        resp.send(req.path.slice(1).toUpperCase() + "!");
    }
    resp.sendStatus(404);
});

module.exports = app;
