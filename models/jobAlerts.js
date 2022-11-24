"use-strict";
const mongoose = require("mongoose");

const JobAlert = new mongoose.Schema({
  userId: { type: String },
  locations: [String],
  positions: [String],
  employmentTypes: [String],
});

module.exports = mongoose.model("JobAlerts", JobAlert);
