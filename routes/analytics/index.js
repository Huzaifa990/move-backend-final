const express = require("express");
const { lessorAnalytics, lesseeAnalytics, adminAnalytics } = require("../../controllers/analytics");

const { ensureAuth } = require("../../middleware/ensure-auth");

const app = express.Router();

app.get("/lessorAnalytics", ensureAuth, lessorAnalytics);
app.get("/lesseeAnalytics", ensureAuth, lesseeAnalytics);
app.get("/adminAnalytics", ensureAuth, adminAnalytics);

module.exports = app;
