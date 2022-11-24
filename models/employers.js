"use-strict";
const mongoose = require("mongoose");

const Employer = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  emailAlerts: { type: Boolean },
  shortListedCandidates: { type: Boolean },
  personalDetails: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    companyName: { type: String },
    numberOfHorses: { type: Number },
    businessAddress: { type: String },
    phoneNumber: { type: String },
    profilePicture: { type: String },
  },
});
module.exports = mongoose.model("Employer", Employer);
