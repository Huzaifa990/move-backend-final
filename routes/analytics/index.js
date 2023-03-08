const express = require("express");
const {
  lessorAnalytics,
  lesseeAnalytics,
  adminAnalytics,
  getAllListings,
  getAllPendingListings,
  getAllPendingBookings,
  getAllBookings,
} = require("../../controllers/analytics");

const { ensureAuth } = require("../../middleware/ensure-auth");

const app = express.Router();

app.get("/lessorAnalytics", ensureAuth, lessorAnalytics);
app.get("/lesseeAnalytics", ensureAuth, lesseeAnalytics);
app.get("/adminAnalytics", ensureAuth, adminAnalytics);
app.get("/adminAnalytics/getAllListings", ensureAuth, getAllListings);
app.get("/adminAnalytics/getAllPendingListings", ensureAuth, getAllPendingListings);
app.get("/adminAnalytics/getAllBookings", ensureAuth, getAllBookings);
app.get("/adminAnalytics/getAllPendingBookings", ensureAuth, getAllPendingBookings);
module.exports = app;
