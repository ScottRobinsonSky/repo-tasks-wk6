const express = require("express");
const { Category, Post } = require("./models");

const app = express();

// Add a GET handler on the "/blog" route that returns a collection of posts.

// Add a GET handler on the "/blog/:slug" route that returns a single post with
// a matching `slug`.

// Add a GET handler on the "/categories" route that returns a collection of
// categories.

// Add a GET handler on the "/categories/:slug" route that returns a single
// category with a matching `slug`.

// Add a GET handler on the "/categories/:slug/posts" route that returns a
// a collection of posts that are in the matching category.

// Return JSON responses and appropriate statuses.

module.exports = app;
