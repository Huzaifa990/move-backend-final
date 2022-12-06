"use-strict";
const mongoose = require("mongoose");

const Listings = new mongoose.Schema({
  carName: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  model: {
    type: Number,
  },
  mileage: {
    type: Number,
  },
  transmission: {
    type: String,
  },
  location: {
    type: String,
  },
  rentPerDay: {
    type: Number,
  },
  picture: [
    {
      type: String,
    },
  ],
  // verified: {
  //   type: Boolean
  // }
});

module.exports = mongoose.model("Listings", Listings);
