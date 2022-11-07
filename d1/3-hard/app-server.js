const express = require("express");
const path = require("path");

const app = express();

// Serve static resources from the `assets` folder.

// Add a GET handler that always responds successfully with the current time
// in a web page, using the following template:

/**
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Time</title>
    <link rel="stylesheet" href="/css/style.css" />
    <script src="/js/script.js" defer></script>
  </head>
  <body>
    <time datetime="DATETIME">HH:MM:SS</time>
  </body>
</html>
*/

// Where:
//
// DATETIME is a valid global date and time string
// HH is current hour
// MM is current minutes
// SS is current seconds
//
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time

module.exports = app;
