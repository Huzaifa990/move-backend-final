const express = require("express");
const { getAllListings } = require("../../controllers/listing");
const { Validator } = require("../../middleware/ensure-auth");

const app = express.Router();

app.get("/", getAllListings);

module.exports = app;
