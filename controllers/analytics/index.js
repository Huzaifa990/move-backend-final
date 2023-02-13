const { default: mongoose } = require("mongoose");
const moment = require("moment");
const listing = require("../../models/listing");
const booking = require("../../models/booking");

const lessorAnalytics = async (req, res) => {
  const { accountType, _id } = req.body;
  if (accountType !== "Lessor") {
    return res.status(200).send({ msg: "Access Denied" });
  }

  const carsListed = await listing.find({ lessor: _id }).count();
  const bookings = await booking.find({ lessor: _id }).populate("paymentDetails", "amount").lean();
  const totalBookings = bookings.length;

  const currentMonth = moment().month() + 1;

  let lifetimeRevenue = 0;
  let currentMonthRevenue = 0;
  let currentMonthBookings = 0;
  if (bookings.length > 0) {
    for (const obj of bookings) {
      lifetimeRevenue += obj.paymentDetails.amount;
    }

    const currentMonthData = bookings.filter((booking) => {
      return moment(booking.bookingDate).month() + 1 === currentMonth;
    });
    if (currentMonthData.length > 0) {
      currentMonthBookings = currentMonthData.length;
      for (const obj of currentMonthData) {
        currentMonthRevenue += obj.paymentDetails.amount;
      }
    }
  }

  const analytics = {
    carsListed,
    totalBookingsReceived: totalBookings,
    lifetimeRevenue,
    currentMonthRevenue,
    currentMonthBookings,
  };

  const allBookings = await booking.find({}).lean();
  let myListings = await listing
    .find({ lessor: _id }, "listingDate company rentPerDay carName status")
    .lean();

  for (const listing of myListings) {
    let carBookedCount = 0;
    for (const booking of allBookings) {
      if (listing._id.toString() === booking.car.toString()) {
        carBookedCount++;
      }
    }
    listing.carBookedCount = carBookedCount;
  }

  return res.status(200).send({ analytics, myListings });
};

const lesseeAnalytics = async (req, res) => {
  const { accountType, _id } = req.body;
  if (accountType !== "Lessee") {
    return res.status(200).send({ msg: "Access Denied" });
  }

  const bookings = await booking.find({ lessee: _id }).populate("paymentDetails", "amount").lean();
  const totalBookings = bookings.length;

  const currentMonth = moment().month() + 1;
  let lifetimeSpent = 0;
  let currentMonthSpent = 0;
  let currentMonthBookings = 0;
  if (bookings.length > 0) {
    for (const obj of bookings) {
      if (obj.status == "completed") lifetimeSpent += obj.paymentDetails.amount;
    }

    const currentMonthData = bookings.filter((booking) => {
      return moment(booking.bookingDate).month() + 1 === currentMonth;
    });
    if (currentMonthData.length > 0) {
      currentMonthBookings = currentMonthData.length;
      for (const obj of currentMonthData) {
        if (obj.status == "completed") currentMonthSpent += obj.paymentDetails.amount;
      }
    }
  }

  const analytics = {
    currentMonthBookings,
    totalBookingsDone: totalBookings,
    lifetimeSpent,
    currentMonthSpent,
  };

  const allBookings = await booking.find({}).lean();
  let myBookings = await booking
    .find({ lessee: _id }, "bookingDate pickupDate dropOffDate paymentDetails car status")
    .populate("paymentDetails", "amount")
    .populate("car", "name company")
    .lean();

  return res.status(200).send({ analytics, myBookings });
};

const adminAnalytics = async (req, res) => {
  const { accountType } = req.body;
  if (accountType !== "Admin") {
    return res.status(200).send({ msg: "Access Denied" });
  }

  return res.status(200).send({ msg: "Admin Analytics" });
};

module.exports = {
  lessorAnalytics,
  lesseeAnalytics,
  adminAnalytics,
};
