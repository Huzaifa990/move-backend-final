require("express-async-errors");
const app = require("express").Router();
const { dbError } = require("../middleware/error");

app.get("/", async (req, res) => {
  res.send("Welcome to my API, please use your desired extension..");
});
app.use("/auth", require("./auth"));
app.use("/contact", require("./contact"));
app.use("/listing", require("./listing"));
app.use("/booking", require("./booking"));

app.use(dbError);

module.exports = app;
