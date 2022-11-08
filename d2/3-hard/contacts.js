const express = require("express");
const { Contact } = require("./models/contact");

const app = express();

app.use(express.json());

// Add a GET handler on the "/contacts" route that returns the collection of
// contacts.

// Add a POST handler on the "/contacts" route that expects a `firstName` and
// `lastName` parameter, and an optional `emailAddress` parameter:
//
// - if the `firstName` and `lastName` (and optional `emailAddress`) parameters
//   are provided, create a new contact and respond with a Created status code.
//
// - if either the `firstName` or `lastName` are missing, respond with a Bad
//   Request status code.

// Add a GET handler on the "/contacts/:id" route:
//
// - if the `id` is valid (i.e., there is a contact with a matching primary
//   key), respond with the associated contact.
//
// - if the `id` is invalid, respond with a Not Found status code.

// Add a DELETE handler on the "/contacts/:id" route which deletes the
// associated contact (if it exists). Respond with an OK status code.

// Add a PUT handler on the "/contacts/:id" route that expects a `firstName`
// and `lastName` parameter, and an optional `emailAddress` parameter:
//
// - if the `id` is invalid, respond with a Not Found status code.
//
// - if the `firstName` and `lastName` (and optional `emailAddress`) parameters
//   are provided, update the associated contact and respond with an OK status
//   code.
//
// - if either the `firstName` or `lastName` are missing, respond with a Bad
//   Request status code.

// Add a PATCH handler on the "/contacts/:id" route that optionally expects a
// `firstName`, `lastName`, and `emailAddress` parameter:
//
// - if the `id` is invalid, respond with a Not Found status code.
//
// - if any of the parameters are provided, update the associated contact and
//   respond with an OK status code.
//

module.exports = app;
