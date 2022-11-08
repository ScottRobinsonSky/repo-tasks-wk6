const express = require("express");

const app = express();

// Form data is URL encoded
app.use(express.urlencoded({ extended: false }));

let data = {};

// Add a GET handler on the "/data" route that responds with the current `data`
// in an `application/json` response body.
app.get("/data", (req, resp) => {
    resp.json(data);
});

// Add a POST handler on the "/data" route that updates the current `data` from
// the request body.
app.post("/data", (req, resp) => {
    if(req.body && Object.keys(req.body).length === 0) {
        resp.sendStatus(400);
    }
    data = {...data, ...req.body};
    resp.set("location", "/data");
    resp.sendStatus(302);
});

module.exports = app;
