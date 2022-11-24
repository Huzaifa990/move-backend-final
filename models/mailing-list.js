"use-strict";
const mongoose = require("mongoose");

const MailingList = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("mailingList", MailingList);
