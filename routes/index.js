require("express-async-errors");
const app = require("express").Router();
const { dbError } = require("../middleware/error");

app.use("/auth", require("./auth"));
app.use(dbError);

module.exports = app;
