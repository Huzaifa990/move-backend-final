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
  markAsComplete,
  cancelBooking,
  checkAndAddBooking,
  cardPayment,
} = require("../../controllers/booking");
const { Validator, ensureAuth } = require("../../middleware/ensure-auth");
const {
  validateNew,
  validateUpdate,
  validateNewCard,
  validateCardPayment,
  validateQuery,
} = require("./validate");

const app = express.Router();

app.get("/", ensureAuth, getAllBookings);
app.post("/", ensureAuth, Validator(validateNew, "body"), addBooking);
app.post("/cardBooking", ensureAuth, Validator(validateNewCard, "body"), checkAndAddBooking);
app.get("/myBookings", ensureAuth, getMyBookings);
app.get("/getLessorBookings", Validator(validateQuery, "query"), ensureAuth, getLessorBookings);
app.get(
  "/getLessorPendingBookings",
  Validator(validateQuery, "query"),
  ensureAuth,
  getLessorPendingBookings
);
app.get("/:id", ensureAuth, getBookingById);
app.delete("/:id", ensureAuth, deleteBooking);
app.put("/stripePayment", ensureAuth, Validator(validateCardPayment, "body"), cardPayment);
app.put("/approve/:id", ensureAuth, approveBooking);
app.put("/reject/:id", ensureAuth, rejectBooking);
app.put("/cancel/:id", ensureAuth, cancelBooking);
app.put("/markAsComplete/:id", ensureAuth, markAsComplete);
// app.put("/:id", ensureAuth, Validator(validateUpdate, "body"), updateBooking);

module.exports = app;
