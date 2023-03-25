const express = require("express");
const {
  lessorWallet,
  graphDataForLessor,
  lesseeWallet,
  graphDataForLessee,
} = require("../../controllers/wallet");

const { ensureAuth } = require("../../middleware/ensure-auth");

const app = express.Router();

app.get("/lessorWallet", ensureAuth, lessorWallet);
app.get("/graphDataForLessor", ensureAuth, graphDataForLessor);
app.get("/lesseeWallet", ensureAuth, lesseeWallet);
app.get("/graphDataForLessee", ensureAuth, graphDataForLessee);

module.exports = app;
