const express = require('express');
const path = require('path');

const app = express();

const publicFolder = path.join(__dirname, 'public');
const assetsFolder = path.join(__dirname, "assets");

// Serve static web pages from the `public` folder, and resources from the
// `assets` folder.
app.use("/", express.static(publicFolder), express.static(assetsFolder));

module.exports = app;
