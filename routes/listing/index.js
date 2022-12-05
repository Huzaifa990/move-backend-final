const express = require("express");
const { getAllListings, addListing, deleteListing, getById } = require("../../controllers/listing");
const { Validator, ensureAuth } = require("../../middleware/ensure-auth");
const { validateNew } = require("./validate");

const app = express.Router();

app.get("/", getAllListings);
app.post("/", ensureAuth, Validator(validateNew, "body"), addListing);
app.get("/:id", ensureAuth, getById);
app.delete("/:id", ensureAuth, deleteListing);

module.exports = app;
