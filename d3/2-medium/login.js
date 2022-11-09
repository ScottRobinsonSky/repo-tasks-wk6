const express = require("express");
const { User } = require("./model/user");

const app = express();

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

module.exports = app;
