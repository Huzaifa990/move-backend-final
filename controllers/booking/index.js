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
  if (checkCar.status === false) {
    return res.status(422).send({ msg: "Car Listing Is Inactive!" });
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
      // Match bookings that belong to the same car and satisfy any of the following conditions:
      $match: {
        $and: [
          { car: mongoose.Types.ObjectId(car) },
          {
            $or: [
              {
                // Existing booking starts before and ends after new booking's pickup date
                pickupDate: {
                  $lte: new Date(pickupDate),
                },
                dropOffDate: {
                  $gte: new Date(pickupDate),
                },
              },
              {
                // Existing booking starts before and ends after new booking's drop-off date
                pickupDate: {
                  $lte: new Date(dropOffDate),
                },
                dropOffDate: {
                  $gte: new Date(dropOffDate),
                },
              },
              {
                // Existing booking starts after new booking's pickup date and ends before new booking's drop-off date
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

  // Calculate the number of days the car will be booked for
  let diff = (new Date(dropOffDate).getTime() - new Date(pickupDate).getTime()) / 1000;
  diff = Math.abs(Math.round(diff));
  let hours = Math.round(diff / 3600);
  const bookingDays = Math.ceil(hours / 24);

  // Calculate the total rent for the booking
  const rent = checkCar.rentPerDay * bookingDays;

  // Create a new payment object
  const payments = new payment({
    paymentMethod,
    amount: rent,
  });
  await payments.save();

  const bookingAppliedDate = moment(new Date());
  const lessor = checkCar.lessor;
  // Create a new booking object
  const bookingg = new booking({
    bookingDate: bookingAppliedDate,
    lessor: lessor,
    lessee: _id,
    car,
    pickupDate,
    dropOffDate,
    bookingDays,
    paymentDetails: payments._id,
  });
  await bookingg.save();

  // Optionally, send an email to confirm the booking

  // Return a success message
  return res.status(200).send({ msg: "Booking Done Successfully" });
};

const getAllBookings = async (req, res) => {
  // need to work on filters like get all bookings against a person, or a car.

  // Extract the account type from the request body
  const { accountType } = req.body;

  // Check if the user's account type is not "Admin"
  if (accountType !== "Admin")
    return res.status(402).send({ msg: "Only Admin Can View All Bookings!" });

  // Find all bookings and populate the associated data for the lessee, car, and payment details
  const bookings = await booking
    .find({})
    .populate("lessee", "name email _id accountType")
    .populate("car")
    .populate("paymentDetails");

  // Return the count and list of bookings
  return res.status(200).send({ count: bookings.length, bookings });
};

const getBookingById = async (req, res) => {
  const id = req.params.id;

  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  const carBooking = await booking
    .findById(id)
    .populate("lessee", "name email _id accountType")
    .populate("lessor", "name email _id accountType")
    .populate("car")
    .populate("paymentDetails");
  if (!carBooking) {
    return res.status(404).send({ msg: "Booking not found!" });
  }

  // TODO: Update the model of the car listing and add a check here to ensure that only the lessor of the car, the lessee who booked it, and the admin can see the booking, not everyone.

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

  if (carBooking.status !== "pending")
    return res.status(200).send({ msg: "Booking cannot be deleted at this stage" });

  // TODO: Handle the history of bookings rather than allowing people to delete closed/done bookings.

  // Delete the booking and the associated payment details
  await booking.deleteOne({ _id: id });
  await payment.deleteOne({ _id: carBooking.paymentDetails });

  // TODO: Add a status field (e.g., "Cancelled", "Confirmed") to the booking model rather than deleting the booking as a whole.

  return res.status(200).send({ msg: "Booking Deleted Successfully" });
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

  if (bookingFound.updatedCount > 2) {
    return res
      .status(402)
      .send({ msg: "Sorry, You have reached the limit for updating this booking!" });
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

  // Return an error if the pickup date is in the past
  if (bookingDate < currentDate) {
    return res.status(404).send({ msg: "Booking Date/Time Cannot Be In Past" });
  }

  // Return an error if the drop off date is before the pickup date
  if (dropOff <= bookingDate) {
    return res.status(404).send({ msg: "Drop Off Date/Time Cannot Be Before Booking Date/Time" });
  }

  // Find bookings that conflict with the updated booking information
  const sameBooking = await booking.aggregate([
    {
      $match: {
        // Find bookings with the same car id
        $and: [
          { car: mongoose.Types.ObjectId(car) },
          // Find bookings with pickup or drop off times that overlap with the updated booking's pickup and drop off times
          {
            $or: [
              // Pickup time is before the updated booking's pickup time and drop off time is after the updated booking's pickup time
              {
                pickupDate: {
                  $lte: new Date(pickupDate),
                },
                dropOffDate: {
                  $gte: new Date(pickupDate),
                },
              },
              // Pickup time is before the updated booking's drop off time and drop off time is after the updated booking's drop off time
              {
                pickupDate: {
                  $lte: new Date(dropOffDate),
                },
                dropOffDate: {
                  $gte: new Date(dropOffDate),
                },
              },
              // Pickup time is after the updated booking's pickup time and drop off time is before the updated booking's drop off time
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
    // Check if the car is already booked in the chosen timeslot
    let found = 0;
    sameBooking.map((x) => {
      // Check if the overlapping booking is not the current one being updated
      if (x._id.toString() !== id || x.lessee.toString() !== _id) {
        found = 1;
      }
    });
    if (found === 1)
      // Return an error if the car is already booked in the chosen timeslot
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

  const newUpdatedCount = bookingFound.updatedCount + 1;
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
      updatedCount: newUpdatedCount,
    }
  );

  return res.status(200).send({ msg: "Booking Updated Successfully" });
};

//bookings done by a lessee
const getMyBookings = async (req, res) => {
  const { _id, accountType } = req.body;

  if (accountType === "Lessor") {
    return res.status(402).send({ msg: "Only Lessees Can View Their Bookings!" });
  }

  const bookings = await booking
    .find({ lessee: _id })
    .sort({ pickupDate: 1 })
    .populate("lessee", "name email _id accountType")
    .populate("car")
    .populate("paymentDetails");

  return res.status(200).send({ count: bookings.length, bookings });
};

const approveBooking = async (req, res) => {
  const id = req.params.id;
  const { accountType, _id } = req.body;
  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  if (accountType == "Lessee") {
    return res.status(422).send({ msg: "You are not allowed to approve a booking" });
  }

  const bookingFound = await booking.findById(id);
  if (!bookingFound) {
    return res.status(404).send({ msg: "Booking not found!" });
  }

  if (bookingFound.lessor.toString() !== _id) {
    return res.status(422).send({ msg: "You are not allowed to approve this booking" });
  }

  if (bookingFound.status == "Accepted") {
    return res.status(422).send({ msg: "This booking is already approved" });
  }

  await booking.updateOne(
    { _id: id },
    {
      status: "Accepted",
    }
  );

  return res.status(200).send({ msg: "Booking Approved Successfully" });
};

const rejectBooking = async (req, res) => {
  const id = req.params.id;
  const { accountType, _id } = req.body;
  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  if (accountType == "Lessee") {
    return res.status(422).send({ msg: "You are not allowed to reject a booking" });
  }

  const bookingFound = await booking.findById(id);
  if (!bookingFound) {
    return res.status(404).send({ msg: "Booking not found!" });
  }

  if (bookingFound.lessor.toString() !== _id && accountType !== "Admin") {
    return res.status(422).send({ msg: "You are not allowed to reject this booking" });
  }

  if (bookingFound.status == "Rejected") {
    return res.status(422).send({ msg: "This booking is already rejected" });
  }

  await booking.updateOne(
    { _id: id },
    {
      status: "Rejected",
    }
  );

  return res.status(200).send({ msg: "Booking Rejected Successfully" });
};

//bookings of lessor's cars
const getLessorBookings = async (req, res) => {
  const { _id, accountType } = req.body;

  if (accountType !== "Lessor") {
    return res.status(402).send({ msg: "Access Denied!" });
  }

  const bookings = await booking
    .find({ lessor: _id, status: { $ne: "pending" } })
    .sort({ status: 1, dropOffDate: 1 })
    .populate("lessee", "name email _id accountType")
    .populate("car", "_id carName company model rentPerDay")
    .populate("paymentDetails");

  return res.status(200).send({ count: bookings.length, bookings });
};

const getLessorPendingBookings = async (req, res) => {
  const { _id, accountType } = req.body;

  if (accountType !== "Lessor") {
    return res.status(402).send({ msg: "Access Denied!" });
  }

  const bookings = await booking
    .find({ lessor: _id, status: { $eq: "pending" } })
    .sort({ status: 1, dropOffDate: 1 })
    .populate("lessee", "name email _id accountType")
    .populate("car", "_id carName company model rentPerDay")
    .populate("paymentDetails");

  return res.status(200).send({ count: bookings.length, bookings });
};

const markAsComplete = async (req, res) => {
  const id = req.params.id;
  const { accountType, _id } = req.body;
  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  if (accountType == "Lessee") {
    return res.status(422).send({ msg: "You are not allowed to mark a booking as complete" });
  }

  const bookingFound = await booking.findById(id);
  if (!bookingFound) {
    return res.status(404).send({ msg: "Booking not found!" });
  }

  if (bookingFound.lessor.toString() !== _id && accountType !== "Admin") {
    return res.status(422).send({ msg: "You are not allowed to mark this booking as complete" });
  }

  if (bookingFound.status == "Rejected") {
    return res.status(422).send({ msg: "You cannot mark a rejected booking as complete" });
  }

  if (bookingFound.status == "pending") {
    return res.status(422).send({ msg: "Please approve the booking first" });
  }

  if (bookingFound.status == "Completed") {
    return res.status(422).send({ msg: "Booking already marked as complete" });
  }

  await booking.updateOne(
    { _id: id },
    {
      status: "Completed",
    }
  );

  return res.status(200).send({ msg: "Booking marked as complete successfully" });
};

const cancelBooking = async (req, res) => {
  const id = req.params.id;
  const { accountType, _id } = req.body;
  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  const bookingFound = await booking.findById(id);
  if (!bookingFound) {
    return res.status(404).send({ msg: "Booking not found!" });
  }

  if (
    bookingFound.lessor.toString() !== _id &&
    bookingFound.lessee.toString() !== _id &&
    accountType !== "Admin"
  ) {
    return res.status(422).send({ msg: "You are not allowed to cancel this booking" });
  }

  if (bookingFound.status == "Cancelled") {
    return res.status(422).send({ msg: "This booking is already cancelled" });
  }

  if (bookingFound.status == "Completed") {
    return res.status(422).send({ msg: "Completed booking cannot be cancelled" });
  }

  if (bookingFound.status == "Rejected") {
    return res.status(422).send({ msg: "Rejected booking cannot be cancelled" });
  }

  await booking.updateOne(
    { _id: id },
    {
      status: "Cancelled",
    }
  );

  //TO DO: deal payment refunds scenario.

  return res.status(200).send({ msg: "Booking Cancelled Successfully" });
};

module.exports = {
  addBooking,
  deleteBooking,
  updateBooking,
  getAllBookings,
  getBookingById,
  getMyBookings,
  approveBooking,
  rejectBooking,
  cancelBooking,
  markAsComplete,
  getLessorBookings,
  getLessorPendingBookings,
};
