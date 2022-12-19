"use-strict";
const mongoose = require("mongoose");

const Booking = new mongoose.Schema({
  lessee: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
  car: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Listings",
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  dropOffDate: {
    type: Date,
    required: true,
  },
  bookingDays: {
    type: Number,
    required: true,
  },
  paymentDetails: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Payment",
  },
});

module.exports = mongoose.model("Booking", Booking);
