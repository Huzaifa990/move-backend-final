const express = require("express");
const {
  addBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
  updateBooking,
} = require("../../controllers/booking");
const { Validator, ensureAuth } = require("../../middleware/ensure-auth");
const { validateNew, validateUpdate } = require("./validate");

const app = express.Router();

app.get("/", ensureAuth, getAllBookings);
app.post("/", ensureAuth, Validator(validateNew, "body"), addBooking);
app.get("/:id", ensureAuth, getBookingById);
app.delete("/:id", ensureAuth, deleteBooking);
app.put("/:id", ensureAuth, Validator(validateUpdate, "body"), updateBooking);

module.exports = app;
