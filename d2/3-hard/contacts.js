const express = require("express");
const { Contact } = require("./models/contact");

const app = express();

app.use(express.json());

// Add a GET handler on the "/contacts" route that returns the collection of
// contacts.
app.get("/contacts", async (req, resp) => {
    resp.json(await Contact.findAll());  
});

// Add a POST handler on the "/contacts" route that expects a `firstName` and
// `lastName` parameter, and an optional `emailAddress` parameter:
//
// - if the `firstName` and `lastName` (and optional `emailAddress`) parameters
//   are provided, create a new contact and respond with a Created status code.
//
// - if either the `firstName` or `lastName` are missing, respond with a Bad
//   Request status code.
app.post("/contacts", async (req, resp) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAddress = req.body.emailAddress;

    if (firstName === undefined || lastName === undefined) {
        resp.sendStatus(400);
        return;
    }
    await Contact.create({firstName: firstName, lastName: lastName, emailAddress: emailAddress});
    resp.sendStatus(201);
});

// Add a GET handler on the "/contacts/:id" route:
//
// - if the `id` is valid (i.e., there is a contact with a matching primary
//   key), respond with the associated contact.
//
// - if the `id` is invalid, respond with a Not Found status code.
app.get("/contacts/:id", async (req, resp) => {
    const contact = await Contact.findByPk(+req.params.id);
    if (contact === null) {
        resp.sendStatus(404);
        return;
    }
    resp.json(contact.toJSON());
});

// Add a DELETE handler on the "/contacts/:id" route which deletes the
// associated contact (if it exists). Respond with an OK status code.
app.delete("/contacts/:id", async (req, resp) => {
    await Contact.destroy({where: {id: +req.params.id}});
    resp.sendStatus(200);
});

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
app.put("/contacts/:id", async (req, resp) => {
    const newFirstName = req.body.firstName;
    const newLastName = req.body.lastName;
    const newEmailAddress = req.body.emailAddress;

    if (newFirstName === undefined || newLastName === undefined) {
        resp.sendStatus(400);
        return;
    }

    const paramsToChange = {
        ...{firstName: newFirstName, lastName: newLastName},
        ...(newEmailAddress === undefined ? {} : {emailAddress: newEmailAddress})
    };

    const [rowsUpdated] = await Contact.update(paramsToChange, {where: {id: +req.params.id}});
    if (rowsUpdated === 0) {
        resp.sendStatus(404);
        return;
    }
    resp.sendStatus(200);
});

// Add a PATCH handler on the "/contacts/:id" route that optionally expects a
// `firstName`, `lastName`, and `emailAddress` parameter:
//
// - if the `id` is invalid, respond with a Not Found status code.
//
// - if any of the parameters are provided, update the associated contact and
//   respond with an OK status code.
//
app.patch("/contacts/:id", async (req, resp) => {
    const paramsToChange = {
        ...(req.body.firstName === undefined ? {} : {firstName: req.body.firstName}),
        ...(req.body.lastName === undefined ? {} : {lastName: req.body.lastName}),
        ...(req.body.emailAddress === undefined ? {} : {emailAddress: req.body.emailAddress})
    };
    
    const [rowsUpdated] = await Contact.update(paramsToChange, {where: {id: +req.params.id}});
    if (rowsUpdated === 0) {
        resp.sendStatus(404);
        return;
    }
    resp.sendStatus(200);
});

module.exports = app;
