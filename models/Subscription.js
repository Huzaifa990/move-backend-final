"use-strict";
const mongoose = require("mongoose");

const Subscription = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
  },
});

module.exports = mongoose.model("subscription", Subscription);
