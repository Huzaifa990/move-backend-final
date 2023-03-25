const { default: mongoose } = require("mongoose");
const moment = require("moment");
const listing = require("../../models/listing");
const booking = require("../../models/booking");
const payment = require("../../models/payment");
const users = require("../../models/users");

const lessorAnalytics = async (req, res) => {
  const { accountType, _id } = req.body;
  if (accountType !== "Lessor") {
    return res.status(200).send({ msg: "Access Denied" });
  }

  const carsListed = await listing.find({ lessor: _id, approved: "Accepted" }).count();
  const bookings = await booking
    .find({ lessor: _id, status: { $in: ["Accepted", "Completed"] } })
    .populate("paymentDetails", "amount")
    .lean();
  const totalBookings = bookings.length;

  const currentMonth = moment().month() + 1;

  let lifetimeRevenue = 0;
  let currentMonthRevenue = 0;
  let currentMonthBookings = 0;
  if (bookings.length > 0) {
    for (const obj of bookings) {
      lifetimeRevenue += obj.paymentDetails.amount * 0.8;
    }

    const currentMonthData = bookings.filter((booking) => {
      return moment(booking.bookingDate).month() + 1 === currentMonth;
    });
    if (currentMonthData.length > 0) {
      currentMonthBookings = currentMonthData.length;
      for (const obj of currentMonthData) {
        currentMonthRevenue += obj.paymentDetails.amount * 0.8;
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
    .find({ lessor: _id }, "listingDate company rentPerDay carName status approved")
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
      if (obj.status == "Completed") lifetimeSpent += obj.paymentDetails.amount;
    }

    const currentMonthData = bookings.filter((booking) => {
      return moment(booking.bookingDate).month() + 1 === currentMonth;
    });
    if (currentMonthData.length > 0) {
      currentMonthBookings = currentMonthData.length;
      for (const obj of currentMonthData) {
        if (obj.status == "Completed") currentMonthSpent += obj.paymentDetails.amount;
      }
    }
  }

  const analytics = {
    currentMonthBookings,
    totalBookingsDone: totalBookings,
    lifetimeSpent,
    currentMonthSpent,
  };

  let myBookings = await booking
    .find({ lessee: _id }, "bookingDate pickupDate dropOffDate paymentDetails car status")
    .populate("paymentDetails", "amount")
    .populate("car", "carName company")
    .lean();

  return res.status(200).send({ analytics, myBookings });
};

const adminAnalytics = async (req, res) => {
  const { accountType } = req.body;
  if (accountType !== "Admin") {
    return res.status(200).send({ msg: "Access Denied" });
  }

  const payments = await payment.find();
  let totalRevenueGenerated = 0;
  if (payments.length > 0) {
    payments.map((x) => {
      totalRevenueGenerated += x.amount;
    });
  }

  const totalMembers = await users.find({}).count();
  const totalLessors = await users.find({ accountType: "Lessor" }).count();
  const totalLessees = await users.find({ accountType: "Lessee" }).count();
  const totalCarListed = await listing.find({ approved: { $eq: "Accepted" } }).count();
  const totalBookings = await booking.find({ status: { $in: ["Completed", "Accepted"] } }).count();

  const analytics = {
    totalRevenueGenerated,
    totalMembers: totalMembers - 1, //admin excluded
    totalLessors,
    totalLessees,
    totalCarListed,
    totalBookings,
  };

  return res.status(200).send({
    analytics,
  });
};

const getAllListings = async (req, res) => {
  const { accountType } = req.body;
  if (accountType !== "Admin") {
    return res.status(200).send({ msg: "Access Denied" });
  }

  let allListings = await listing
    .find(
      { approved: { $ne: "pending" } },
      "listingDate company rentPerDay carName status approved lessor"
    )
    .populate("lessor", "email name")
    .sort({ carName: 1, company: 1 })
    .lean();

  return res.status(200).send({ count: allListings.length, allListings });
};

const getAllPendingListings = async (req, res) => {
  const { accountType } = req.body;
  if (accountType !== "Admin") {
    return res.status(200).send({ msg: "Access Denied" });
  }

  let pendingListings = await listing
    .find(
      { approved: { $eq: "pending" } },
      "listingDate company rentPerDay carName status approved lessor"
    )
    .populate("lessor", "email name")
    .sort({ listingDate: 1 })
    .lean();

  return res.status(200).send({ count: pendingListings.length, pendingListings });
};

const getAllBookings = async (req, res) => {
  const { accountType } = req.body;
  if (accountType !== "Admin") {
    return res.status(200).send({ msg: "Access Denied" });
  }

  let allBookings = await booking
    .find(
      { status: { $ne: "pending" } },
      "bookingDate pickupDate dropOffDate paymentDetails car status lessor lessee"
    )
    .populate("paymentDetails", "amount paymentMethod")
    .populate("car", "carName company")
    .populate("lessor", "email")
    .populate("lessee", "email")
    .sort({ bookingDate: -1, "car.carName": 1, "car.company": 1 })
    .lean();

  return res.status(200).send({ count: allBookings.length, allBookings });
};

const getAllPendingBookings = async (req, res) => {
  const { accountType } = req.body;
  if (accountType !== "Admin") {
    return res.status(200).send({ msg: "Access Denied" });
  }

  let pendingBookings = await booking
    .find(
      { status: { $eq: "pending" } },
      "bookingDate pickupDate dropOffDate paymentDetails car status lessor lessee"
    )
    .populate("paymentDetails", "amount paymentMethod")
    .populate("car", "carName company")
    .populate("lessor", "email")
    .populate("lessee", "email")
    .sort({ bookingDate: -1, "car.carName": 1, "car.company": 1 })
    .lean();

  return res.status(200).send({ count: pendingBookings.length, pendingBookings });
};

module.exports = {
  lessorAnalytics,
  lesseeAnalytics,
  adminAnalytics,
  getAllListings,
  getAllBookings,
  getAllPendingListings,
  getAllPendingBookings,
};
