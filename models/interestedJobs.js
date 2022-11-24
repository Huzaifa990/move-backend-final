"use-strict";
require("dotenv").config();
const mongoose = require("mongoose");
const interestedJob = new mongoose.Schema({
  userId: {
    type: String,
  },
  jobTitle: { type: String },
  jobId: { type: mongoose.Schema.Types.ObjectId },
  jobPostedByEmployerId: { type: String },
  dateApplied: { type: Date },
  companyImage: { type: String },
  companyName: { type: String },
  coverLetter: { type: String },
  candidateNote: { type: String },
  shortlisted: { type: Boolean },
  notInterested: { type: Boolean },
  notes: { type: String },
  videoInterviewRequest: { type: Boolean },
  interviewQuestions: [String],
  interviewRequestDate: Date,
  interviewVideoUrl: { type: String },
  applicationRemoved: { type: Boolean },
});
module.exports = mongoose.model("interestedJob", interestedJob);
