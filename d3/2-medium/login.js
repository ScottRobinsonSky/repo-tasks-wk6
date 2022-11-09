const express = require("express");
const { Op } = require("sequelize");
const { User } = require("./model/user");

const app = express();
app.use(express.json());

// Add a POST handler on the "/login" route that expects a `username_or_email`
// and a `password` parameter in a JSON body.
//
// - If either `username_or_email` or `password` is missing from the request,
//   send a Bad Request status in response.
//
// - If `username_or_email` matches an existing user and the `password` also
//   mactches, send a redirect to "/" in response.
//
// - Otherwise, send an Unauthorized status in reponse.
app.post("/login", async (req, resp) => {
    const usernameOrEmail = req.body.username_or_email;
    const password = req.body.password;
    if (usernameOrEmail === undefined || password === undefined) {
        resp.sendStatus(400);
        return;
    }
    const user = await User.findOne({where: {
        [Op.and]: [
            {
                [Op.or]: [
                    {username: usernameOrEmail},
                    {email: usernameOrEmail}
                ],
            },
            {
                password: password
            }
        ]
    }});
    if (user === null) {
        resp.sendStatus(401);
    } else {
        resp.redirect("/");
    }
});

module.exports = app;
