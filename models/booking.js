"use-strict";
const mongoose = require("mongoose");

const Booking = new mongoose.Schema({
  bookingDate: {
    type: Date,
  },
  lessor: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
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
  updatedCount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Booking", Booking);
