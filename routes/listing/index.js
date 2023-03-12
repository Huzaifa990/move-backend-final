const express = require("express");
const {
  getAllListings,
  addListing,
  deleteListing,
  getById,
  updateListing,
  myListings,
  toggleListingStatus,
  verifyLessorListing,
  rejectLessorListing,
} = require("../../controllers/listing");
const { Validator, ensureAuth } = require("../../middleware/ensure-auth");
const { validateNew, validateUpdate } = require("./validate");

const app = express.Router();

app.get("/", getAllListings);
app.post("/", ensureAuth, Validator(validateNew, "body"), addListing);
app.get("/my-listings", ensureAuth, myListings);
app.get("/:id", ensureAuth, getById);
app.delete("/:id", ensureAuth, deleteListing);
app.put("/toggle/:id", ensureAuth, toggleListingStatus);
app.put("/verifyListing/:id", ensureAuth, verifyLessorListing);
app.put("/rejectListing/:id", ensureAuth, rejectLessorListing);
app.put("/:id", ensureAuth, Validator(validateUpdate, "body"), updateListing);
module.exports = app;
