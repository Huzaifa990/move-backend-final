const express = require("express");
const { contactUs } = require("../../controllers/contactUs");

const { Validator } = require("../../middleware/ensure-auth");
const { validateContactUs } = require("./validate");

const app = express.Router();

app.post("/", Validator(validateContactUs, "body"), contactUs);

module.exports = app;
