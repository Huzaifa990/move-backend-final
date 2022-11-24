"use-strict";
const mongoose = require("mongoose");

const Advertiser = new mongoose.Schema(
  {
    userId: String,
    firstName: String,
    lastName: String,
    organization: String,
    businessPhone: String,
    streetAddress: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    email: String,
    cellPhone: String,
    typesOfAdvertising: [String],
    equestrian: Boolean,
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Advertiser", Advertiser);
