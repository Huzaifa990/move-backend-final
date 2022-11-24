require("express-async-errors");
const express = require("express");
require("../middleware/logger")();

const app = express.Router();

app.use(express.urlencoded({ extended: true, limit: "3mb" }));
app.use(express.json({ limit: "3mb" }));
app.use(express.static("public"));

app.use("/api/", require("../routes"));

module.exports = app;
