const express = require("express");
const { Category, Post } = require("./models");

const app = express();

// Add a GET handler on the "/blog" route that returns a collection of posts.
app.get("/blog", async (req, resp) => {
    resp.json(await Post.findAll());
});

// Add a GET handler on the "/blog/:slug" route that returns a single post with
// a matching `slug`.
app.get("/blog/:slug", async (req, resp) => {
    const post = await Post.findOne({where: {slug: req.params.slug}});
    if (post === null) {
        resp.sendStatus(404);
        return;   
    }
    resp.json(post.toJSON());
})

// Add a GET handler on the "/categories" route that returns a collection of
// categories.
app.get("/categories", async (req, resp) => {
    resp.json(await Category.findAll());
});

// Add a GET handler on the "/categories/:slug" route that returns a single
// category with a matching `slug`.
app.get("/categories/:slug", async (req, resp) => {
    const category = await Category.findOne({where: {slug: req.params.slug}});
    if (category === null) {
        resp.sendStatus(404);
        return;
    }
    resp.json(category.toJSON());
});

// Add a GET handler on the "/categories/:slug/posts" route that returns a
// a collection of posts that are in the matching category.
app.get("/categories/:slug/posts", async (req, resp) => {
    const category = await Category.findOne({where: {slug: req.params.slug}});
    if (category === null) { 
        resp.sendStatus(404);
        return;
    }
    const posts = await category.getPosts();
    resp.json(posts);
});


module.exports = app;
