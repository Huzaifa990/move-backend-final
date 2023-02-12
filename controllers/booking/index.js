const { default: mongoose } = require("mongoose");
const moment = require("moment");
const listing = require("../../models/listing");
const User = require("../../models/users");
const booking = require("../../models/booking");
const payment = require("../../models/payment");

const addBooking = async (req, res) => {
  // Extract the necessary data from the request body
  const { car, pickupDate, dropOffDate, _id, accountType, paymentMethod } = req.body;

  // Validate the ID
  const valid = mongoose.isValidObjectId(_id);
  if (!_id || _id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  // Find the user by ID
  let user = await User.findById({ _id });
  if (!user) {
    return res.status(404).send({ msg: "User not found!" });
  }

  // Check if the user's account type is "Lessor" and stop him/her from booking.
  if (accountType === "Lessor") {
    return res.status(404).send({ msg: "This account type is not allowed to do a booking" });
  }

  // Find the car by ID
  let checkCar = await listing.findById(car);
  if (!checkCar) {
    return res.status(404).send({ msg: "Car Listing Not Found!" });
  }

  // Get the current date and the booking and drop-off dates
  const currentDate = moment(new Date());
  const bookingDate = moment(pickupDate);
  const dropOff = moment(dropOffDate);

  // Check if the booking date is in the past
  if (bookingDate < currentDate) {
    return res.status(404).send({ msg: "Booking Date/Time Cannot Be In Past" });
  }
  // Check if the drop-off date is before the booking date
  if (dropOff <= bookingDate) {
    return res.status(404).send({ msg: "Drop Off Date/Time Cannot Be Before Booking Date/Time" });
  }

  // Check if the car is already booked for the given timeslot
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
  // Extract the booking ID from the request params
  const id = req.params.id;

  // Validate the ID
  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  // Find the booking by ID and populate the associated data for the lessee, car, and payment details
  const carBooking = await booking
    .findById(id)
    .populate("lessee", "name email _id accountType")
    .populate("car")
    .populate("paymentDetails");
  if (!carBooking) {
    return res.status(404).send({ msg: "Booking not found!" });
  }

  // TODO: Update the model of the car listing and add a check here to ensure that only the lessor of the car, the lessee who booked it, and the admin can see the booking, not everyone.

  // Return the booking details
  return res.status(200).send({ carBooking });
};

const deleteBooking = async (req, res) => {
  // Extract the booking ID from the request params
  const id = req.params.id;

  // Validate the ID
  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  // Find the booking by ID
  const carBooking = await booking.findById(id);
  if (!carBooking) {
    return res.status(404).send({ msg: "Booking not found!" });
  }

  // TODO: Handle the history of bookings rather than allowing people to delete closed/done bookings.

  // Delete the booking and the associated payment details
  await booking.deleteOne({ _id: id });
  await payment.deleteOne({ _id: carBooking.paymentDetails });

  // TODO: Add a status field (e.g., "Cancelled", "Confirmed") to the booking model rather than deleting the booking as a whole.

  // Return a success message
  return res.status(200).send({ msg: "Booking Cancelled Successfully" });
};

const updateBooking = async (req, res) => {
  // Get the booking id from the request parameters
  const id = req.params.id;
  // Get the updated booking information from the request body
  const { car, pickupDate, dropOffDate, _id, accountType, paymentMethod } = req.body;

  // Check if the id is a valid MongoDB ObjectId
  const valid = mongoose.isValidObjectId(id);
  // Return an error if the id is invalid
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  // Find the booking using the id
  const bookingFound = await booking.findById(id);
  // Return an error if the booking is not found
  if (!bookingFound) {
    return res.status(404).send({ msg: "Booking not found!" });
  }

  // Return an error if the number of times the booking has been updated is greater than 3
  if (bookingFound.updatedCount > 2) {
    return res
      .status(402)
      .send({ msg: "Sorry, You have reached the limit for updating this booking!" });
  }

  // Find the user associated with the booking
  let user = await User.findById({ _id });
  // Return an error if the user is not found
  if (!user) {
    return res.status(404).send({ msg: "User not found!" });
  }

  // Return an error if the user's account type is "Lessor"
  if (accountType === "Lessor") {
    return res.status(404).send({ msg: "This account type is not allowed to update a booking" });
  }

  // Find the car listing using the car id
  let checkCar = await listing.findById(car);
  // Return an error if the car listing is not found
  if (!checkCar) {
    return res.status(404).send({ msg: "Car Listing Not Found!" });
  }

  // Get the current date and time
  const currentDate = moment(new Date());
  // Get the pickup date and time as a moment object
  const bookingDate = moment(pickupDate);
  // Get the drop off date and time as a moment object
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

  // Calculate the number of days in the booking
  let diff = (new Date(dropOffDate).getTime() - new Date(pickupDate).getTime()) / 1000;
  diff = Math.abs(Math.round(diff));
  let hours = Math.round(diff / 3600);
  const bookingDays = Math.ceil(hours / 24);

  // Calculate the rental cost for the booking
  const rent = checkCar.rentPerDay * bookingDays;

  // Update the payment details for the booking
  const payments = await payment.updateOne(
    { _id: bookingFound.paymentDetails },
    {
      paymentMethod,
      amount: rent,
    }
  );

  // Update the booking itself
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

  // email sending on confirm booking can be sent.. to be added or not will decide.
  // Return success message to the client
  return res.status(200).send({ msg: "Booking Updated Successfully" });
};

const getMyBookings = async (req, res) => {
  // Extract the user ID and account type from the request body
  const { _id, accountType } = req.body;

  // If the user is a lessor, return an error message
  if (accountType === "Lessor") {
    return res.status(402).send({ msg: "Only Lessees Can View Their Bookings!" });
  }

  // Find bookings that were made by the user and sort them by the pickupDate field in ascending order
  // Populate the lessee, car, and paymentDetails fields with the corresponding documents
  const bookings = await booking
    .find({ lessee: _id })
    .sort({ pickupDate: 1 })
    .populate("lessee", "name email _id accountType")
    .populate("car")
    .populate("paymentDetails");

  // Return the number of bookings and the bookings array to the client
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
