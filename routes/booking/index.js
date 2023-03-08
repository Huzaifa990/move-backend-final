const express = require("express");
const {
  addBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
  updateBooking,
  getMyBookings,
  approveBooking,
  rejectBooking,
  getLessorBookings,
  getLessorPendingBookings,
} = require("../../controllers/booking");
const { Validator, ensureAuth } = require("../../middleware/ensure-auth");
const { validateNew, validateUpdate } = require("./validate");

const app = express.Router();

app.get("/", ensureAuth, getAllBookings);
app.post("/", ensureAuth, Validator(validateNew, "body"), addBooking);
app.get("/myBookings", ensureAuth, getMyBookings);
app.get("/getLessorBookings", ensureAuth, getLessorBookings);
app.get("/getLessorPendingBookings", ensureAuth, getLessorPendingBookings);
app.get("/:id", ensureAuth, getBookingById);
app.delete("/:id", ensureAuth, deleteBooking);
app.put("/approve/:id", ensureAuth, approveBooking);
app.put("/reject/:id", ensureAuth, rejectBooking);
app.put("/:id", ensureAuth, Validator(validateUpdate, "body"), updateBooking);

module.exports = app;
