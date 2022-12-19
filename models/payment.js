"use-strict";
const mongoose = require("mongoose");

const Payment = new mongoose.Schema({
  paymentMethod: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Payment", Payment);
