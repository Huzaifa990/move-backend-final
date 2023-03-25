"use-strict";
const mongoose = require("mongoose");

const Wallet = new mongoose.Schema(
  {
    dropOffDate: {
      type: Date,
      required: true,
    },
    lessorId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    lesseeId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "users",
    },
    bookingId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "bookings",
    },
    paidStatus: {
      type: String,
      default: "pending",
    },
    amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wallet", Wallet);
