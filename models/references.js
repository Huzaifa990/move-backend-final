"use-strict";
const mongoose = require("mongoose");

const Reference = new mongoose.Schema({
  userId: {
    type: String,
  },
  email: { type: String },
  ratings: {
    reEmploy: { type: Number },
    cleanliness: { type: Number },
    horsemanship: { type: Number },
    thoroughness: { type: Number },
    punctuality: { type: Number },
    communication: { type: Number },
    teamPlayer: { type: Number },
    professionalism: { type: Number },
    workEthic: { type: Number },
    comment: { type: String },
  },
});

Reference.index({ userId: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("Reference", Reference);
