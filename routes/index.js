require("express-async-errors");
const express = require("express");
const { error } = require("../middleware/error");
const app = express.Router();

app.use("/auth", require("./auth"));

app.use(error);

module.exports = app;
