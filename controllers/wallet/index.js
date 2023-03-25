const booking = require("../../models/booking");
const wallet = require("../../models/wallet");
const moment = require("moment");

const lessorWallet = async (req, res) => {
  let { _id, accountType } = req.body;

  if (accountType !== "Lessor") return res.status(400).json({ msg: "Access Denied" });

  const pendingBalance = await wallet.find({ paidStatus: "pending", lessorId: _id }).lean();
  let amount = 0;
  if (pendingBalance.length > 0) {
    for (const obj of pendingBalance) {
      amount += obj.amount;
    }
  }

  const recentBookings = await booking
    .find(
      { lessor: _id, status: { $in: ["Completed"] } },
      "bookingDays paymentDetails car status bookingDate pickupDate dropOffDate"
    )
    .sort({ dropOffDate: -1 })
    .limit(3)
    .populate("paymentDetails", "amount paymentMethod")
    .populate("car", "carName company picture rentPerDay")
    .lean();

  if (recentBookings.length > 0) {
    for (const booking of recentBookings) {
      booking.paymentDetails.amount = booking.paymentDetails.amount * 0.8;
    }
  }

  const upcomingBookings = await booking
    .find(
      { lessor: _id, status: { $in: ["Accepted"] } },
      "bookingDays paymentDetails car status bookingDate pickupDate dropOffDate"
    )
    .sort({ pickupDate: 1 })
    .populate("paymentDetails", "amount paymentMethod")
    .populate("car", "carName company rentPerDay")
    .lean();

  if (upcomingBookings.length > 0) {
    for (const booking of upcomingBookings) {
      booking.paymentDetails.amount = booking.paymentDetails.amount * 0.8;
    }
  }

  return res.status(200).json({
    pendingBalance: amount,
    recentBookings,
    upcomingBookings,
  });
};

const graphDataForLessor = async (req, res) => {
  let { _id, accountType } = req.body;

  if (accountType !== "Lessor") return res.status(400).json({ msg: "Access Denied" });

  const completedBookings = await booking
    .find({ lessor: _id, status: { $in: ["Completed"] } })
    .populate("paymentDetails", "amount")
    .lean();

  let currentYear = moment().year();
  let currentMonth = moment().month() + 1;

  let earnings = [];
  for (let i = 1; i <= currentMonth; i++) {
    let monthEarnings = 0;
    for (const booking of completedBookings) {
      if (
        moment(booking.dropOffDate).month() + 1 === i &&
        moment(booking.dropOffDate).year() === currentYear
      ) {
        monthEarnings += booking.paymentDetails.amount * 0.8;
      }
    }
    earnings.push(monthEarnings);
  }

  return res.status(200).json({
    earnings,
  });
};

const lesseeWallet = async (req, res) => {
  let { _id, accountType } = req.body;

  if (accountType !== "Lessee") return res.status(400).json({ msg: "Access Denied" });

  const pendingBalance = await wallet.find({ paidStatus: "pending", lesseeId: _id }).lean();
  let amount = 0;
  if (pendingBalance.length > 0) {
    for (const obj of pendingBalance) {
      amount += obj.amount;
    }
  }

  const recentBookings = await booking
    .find(
      { lessee: _id, status: { $in: ["Completed"] } },
      "bookingDays paymentDetails car status bookingDate pickupDate dropOffDate"
    )
    .sort({ dropOffDate: -1 })
    .limit(3)
    .populate("paymentDetails", "amount paymentMethod")
    .populate("car", "carName company picture rentPerDay")
    .lean();

  if (recentBookings.length > 0) {
    for (const booking of recentBookings) {
      booking.paymentDetails.amount = booking.paymentDetails.amount * 0.8;
    }
  }

  const upcomingBookings = await booking
    .find(
      { lessee: _id, status: { $in: ["Accepted"] } },
      "bookingDays paymentDetails car status bookingDate pickupDate dropOffDate"
    )
    .sort({ pickupDate: 1 })
    .populate("paymentDetails", "amount paymentMethod")
    .populate("car", "carName company rentPerDay")
    .lean();

  if (upcomingBookings.length > 0) {
    for (const booking of upcomingBookings) {
      booking.paymentDetails.amount = booking.paymentDetails.amount * 0.8;
    }
  }

  return res.status(200).json({
    pendingBalance: amount,
    recentBookings,
    upcomingBookings,
  });
};

const graphDataForLessee = async (req, res) => {
  let { _id, accountType } = req.body;

  if (accountType !== "Lessee") return res.status(400).json({ msg: "Access Denied" });

  const completedBookings = await booking
    .find({ lessee: _id, status: { $in: ["Completed"] } })
    .populate("paymentDetails", "amount")
    .lean();

  let currentYear = moment().year();
  let currentMonth = moment().month() + 1;

  let spendings = [];
  for (let i = 1; i <= currentMonth; i++) {
    let monthSpendings = 0;
    for (const booking of completedBookings) {
      if (
        moment(booking.dropOffDate).month() + 1 === i &&
        moment(booking.dropOffDate).year() === currentYear
      ) {
        monthSpendings += booking.paymentDetails.amount * 0.8;
      }
    }
    spendings.push(monthSpendings);
  }

  return res.status(200).json({
    spendings,
  });
};

module.exports = {
  lessorWallet,
  lesseeWallet,
  graphDataForLessor,
  graphDataForLessee,
};
