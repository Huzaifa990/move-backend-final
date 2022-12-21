const { default: mongoose } = require("mongoose");
const moment = require("moment");
const listing = require("../../models/listing");
const User = require("../../models/users");
const booking = require("../../models/booking");
const payment = require("../../models/payment");

const addBooking = async (req, res) => {
  const { car, pickupDate, dropOffDate, _id, accountType, paymentMethod } = req.body;

  const valid = mongoose.isValidObjectId(_id);
  if (!_id || _id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  let user = await User.findById({ _id });
  if (!user) {
    return res.status(404).send({ msg: "User not found!" });
  }

  if (accountType === "Lessor") {
    return res.status(404).send({ msg: "This account type is not allowed to do a booking" });
  }

  let checkCar = await listing.findById(car);
  if (!checkCar) {
    return res.status(404).send({ msg: "Car Listing Not Found!" });
  }

  const currentDate = moment(new Date());
  const bookingDate = moment(pickupDate);
  const dropOff = moment(dropOffDate);

  if (bookingDate < currentDate) {
    return res.status(404).send({ msg: "Booking Date/Time Cannot Be In Past" });
  }
  if (dropOff <= bookingDate) {
    return res.status(404).send({ msg: "Drop Off Date/Time Cannot Be Before Booking Date/Time" });
  }

  const sameBooking = await booking.aggregate([
    {
      $match: {
        $and: [
          { car: mongoose.Types.ObjectId(car) },
          {
            $or: [
              {
                pickupDate: {
                  $lte: new Date(pickupDate),
                },
                dropOffDate: {
                  $gte: new Date(pickupDate),
                },
              },
              {
                pickupDate: {
                  $lte: new Date(dropOffDate),
                },
                dropOffDate: {
                  $gte: new Date(dropOffDate),
                },
              },
              {
                pickupDate: {
                  $gt: new Date(pickupDate),
                },
                dropOffDate: {
                  $lt: new Date(dropOffDate),
                },
              },
            ],
          },
        ],
      },
    },
  ]);
  if (sameBooking.length > 0) {
    return res.status(404).send({ msg: "This car is already booked in the chosen timeslot!" });
  }

  let diff = (new Date(dropOffDate).getTime() - new Date(pickupDate).getTime()) / 1000;
  diff = Math.abs(Math.round(diff));
  let hours = Math.round(diff / 3600);
  const bookingDays = Math.ceil(hours / 24);

  const rent = checkCar.rentPerDay * bookingDays;

  const payments = new payment({
    paymentMethod,
    amount: rent,
  });
  await payments.save();

  const bookingg = new booking({
    lessee: _id,
    car,
    pickupDate,
    dropOffDate,
    bookingDays,
    paymentDetails: payments._id,
  });
  await bookingg.save();

  // email sending on confirm booking can be sent.. to be added or not will decide.

  return res.status(200).send({ msg: "Booking Done Successfully" });
};

const getAllBookings = async (req, res) => {
  // need to work on filters like get all bookings against a person, or a car.
  const { accountType } = req.body;

  if (accountType !== "Admin")
    return res.status(402).send({ msg: "Only Admin Can View All Bookings!" });

  const bookings = await booking
    .find({})
    .populate("lessee", "name email _id accountType")
    .populate("car")
    .populate("paymentDetails");
  return res.status(200).send({ count: bookings.length, bookings });
};

const getBookingById = async (req, res) => {
  const id = req.params.id;

  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  const carBooking = await booking
    .findById(id)
    .populate("lessee", "name email _id accountType")
    .populate("car")
    .populate("paymentDetails");
  if (!carBooking) {
    return res.status(404).send({ msg: "Booking not found!" });
  }

  // need to update model of car listing and add a check here to ensure only lessor of car, lessee who booked it and admin can see the booking, not everyone.

  return res.status(200).send({ carBooking });
};

const deleteBooking = async (req, res) => {
  const id = req.params.id;

  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  const carBooking = await booking.findById(id);
  if (!carBooking) {
    return res.status(404).send({ msg: "Booking not found!" });
  }

  //need to handle history of bookings rather than allowing people to delete closed/done bookings.

  await booking.deleteOne({ _id: id });
  await payment.deleteOne({ _id: carBooking.paymentDetails });

  // need to add Cancelled, confirmed etc status later rather than deleting booking as a whole

  return res.status(200).send({ msg: "Booking Cancelled Successfully" });
};

const updateBooking = async (req, res) => {
  const id = req.params.id;
  const { car, pickupDate, dropOffDate, _id, accountType, paymentMethod } = req.body;

  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  const bookingFound = await booking.findById(id);
  if (!bookingFound) {
    return res.status(404).send({ msg: "Booking not found!" });
  }

  let user = await User.findById({ _id });
  if (!user) {
    return res.status(404).send({ msg: "User not found!" });
  }

  if (accountType === "Lessor") {
    return res.status(404).send({ msg: "This account type is not allowed to update a booking" });
  }

  let checkCar = await listing.findById(car);
  if (!checkCar) {
    return res.status(404).send({ msg: "Car Listing Not Found!" });
  }

  const currentDate = moment(new Date());
  const bookingDate = moment(pickupDate);
  const dropOff = moment(dropOffDate);

  if (bookingDate < currentDate) {
    return res.status(404).send({ msg: "Booking Date/Time Cannot Be In Past" });
  }
  if (dropOff <= bookingDate) {
    return res.status(404).send({ msg: "Drop Off Date/Time Cannot Be Before Booking Date/Time" });
  }

  const sameBooking = await booking.aggregate([
    {
      $match: {
        $and: [
          { car: mongoose.Types.ObjectId(car) },
          {
            $or: [
              {
                pickupDate: {
                  $lte: new Date(pickupDate),
                },
                dropOffDate: {
                  $gte: new Date(pickupDate),
                },
              },
              {
                pickupDate: {
                  $lte: new Date(dropOffDate),
                },
                dropOffDate: {
                  $gte: new Date(dropOffDate),
                },
              },
              {
                pickupDate: {
                  $gt: new Date(pickupDate),
                },
                dropOffDate: {
                  $lt: new Date(dropOffDate),
                },
              },
            ],
          },
        ],
      },
    },
  ]);
  if (sameBooking.length > 0) {
    if (sameBooking[0]._id !== id && sameBooking[0].lessee !== _id)
      return res.status(404).send({ msg: "This car is already booked in the chosen timeslot!" });
  }

  let diff = (new Date(dropOffDate).getTime() - new Date(pickupDate).getTime()) / 1000;
  diff = Math.abs(Math.round(diff));
  let hours = Math.round(diff / 3600);
  const bookingDays = Math.ceil(hours / 24);

  const rent = checkCar.rentPerDay * bookingDays;

  const payments = await payment.updateOne(
    { _id: bookingFound.paymentDetails },
    {
      paymentMethod,
      amount: rent,
    }
  );

  const bookingg = await booking.updateOne(
    {
      _id: id,
    },
    {
      lessee: _id,
      car,
      pickupDate,
      dropOffDate,
      bookingDays,
      paymentDetails: payments._id,
    }
  );

  // email sending on confirm booking can be sent.. to be added or not will decide.

  return res.status(200).send({ msg: "Booking Updated Successfully" });
};

const getMyBookings = async (req, res) => {
  const { _id, accountType } = req.body;
  if (accountType === "Lessor") {
    return res.status(402).send({ msg: "Only Lessees Can View Their Bookings!" });
  }
  const bookings = await booking
    .find({ lessee: _id })
    .populate("lessee", "name email _id accountType")
    .populate("car")
    .populate("paymentDetails");
  return res.status(200).send({ count: bookings.length, bookings });
};

module.exports = {
  addBooking,
  deleteBooking,
  updateBooking,
  getAllBookings,
  getBookingById,
  getMyBookings,
};
