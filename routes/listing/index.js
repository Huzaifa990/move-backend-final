const express = require("express");
const {
  getAllListings,
  addListing,
  deleteListing,
  getById,
  updateListing,
} = require("../../controllers/listing");
const { Validator, ensureAuth } = require("../../middleware/ensure-auth");
const { validateNew, validateUpdate } = require("./validate");

const app = express.Router();

app.get("/", getAllListings);
app.post("/", ensureAuth, Validator(validateNew, "body"), addListing);
app.get("/:id", ensureAuth, getById);
app.delete("/:id", ensureAuth, deleteListing);
app.put("/:id", ensureAuth, Validator(validateUpdate, "body"), updateListing);

module.exports = app;
