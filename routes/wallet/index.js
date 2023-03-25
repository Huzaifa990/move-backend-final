const express = require("express");
const { lessorWallet, graphDataForLessor } = require("../../controllers/wallet");

const { ensureAuth } = require("../../middleware/ensure-auth");

const app = express.Router();

app.get("/lessorWallet", ensureAuth, lessorWallet);
app.get("/graphDataForLessor", ensureAuth, graphDataForLessor);

module.exports = app;
