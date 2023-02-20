const moment = require("moment");
const { default: mongoose } = require("mongoose");
const listing = require("../../models/listing");

const getAllListings = async (req, res) => {
  const listings = await listing.find({});
  //need to add in filters
  return res.status(200).send({ count: listings.length, listings });
};

const addListing = async (req, res) => {
  // Destructure the request body
  const {
    carName,
    company,
    model,
    mileage,
    transmission,
    location,
    rentPerDay,
    picture,
    _id,
    accountType,
  } = req.body;

  // Check if the user is a lessee
  if (accountType === "Lessee") {
    // Return an error if the user is a lessee
    return res.status(402).send({ msg: "This Account Cannot Add A Listing" });
  }

  const listingAppliedDate = moment(new Date());

  // Create a new car listing
  const listedCar = new listing({
    listingDate: listingAppliedDate,
    lessor: mongoose.Types.ObjectId(_id),
    carName,
    company,
    model,
    mileage,
    transmission,
    location,
    rentPerDay,
    picture,
    // verified: false,
  });
  await listedCar.save();

  //need to cater admin side.. initially verified: false should be there...

  // Return a success message to the client
  return res.status(200).send({ msg: "Listing Added Successfully" });
};

const deleteListing = async (req, res) => {
  // Get the ID of the listing to be deleted from the request parameters
  const { id } = req.params;

  // Validate the ID
  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) {
    // Return an error if the ID is invalid
    return res.status(403).send({ msg: "Invalid Id" });
  }

  // Find the listing with the given ID
  const getById = await listing.findById(id);
  if (!getById) {
    // Return an error if no such listing is found
    return res.status(422).send({ msg: "No Such Listing Found!" });
  }

  // Delete the listing
  await listing.deleteOne({ _id: id });

  // Return a success message to the client
  res.status(200).send({ msg: "Listing Deleted Successfully!" });
};

const getById = async (req, res) => {
  // Get the ID of the listing to be retrieved from the request parameters
  const id = req.params.id;

  // Validate the ID
  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  // Find the listing with the given ID
  const item = await listing.findById(id);
  if (!item) {
    // Return an error if no such listing is found
    return res.status(422).send({ msg: "No Such Listing Found!" });
  }

  // Return the listing to the client
  res.status(200).send({ item });
};

const updateListing = async (req, res) => {
  // Destructure the request body
  const { carName, company, model, mileage, transmission, location, rentPerDay, picture } =
    req.body;

  const id = req.params.id;
  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  // Find the listing with the given ID
  const item = await listing.findById(id);
  if (!item) {
    // Return an error if no such listing is found
    return res.status(422).send({ msg: "No Such Listing Found!" });
  }

  // Update the listing
  await listing.updateOne(
    { _id: id },
    {
      carName,
      company,
      model,
      mileage,
      transmission,
      location,
      rentPerDay,
      picture,
      // verified: false,
    }
  );

  //need to cater admin side.. when will a listing go under reverification (in case of rentPerDay changed or location changed, or car details like model, name, company changed etc)

  // Return a success message to the client
  return res.status(200).send({ msg: "Listing Updated Successfully!" });
};

const myListings = async (req, res) => {
  // Get the user's ID from the request body
  const { _id } = req.body;

  // Find all the listings belonging to the user
  const listings = await listing.find({ lessor: _id });

  // Return the number of listings and the listings to the client
  res.status(200).send({ count: listings.length, listings });
};

const toggleListingStatus = async (req, res) => {
  const id = req.params.id;
  const { accountType, _id } = req.body;
  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  if (accountType === "Lessee") {
    return res.status(422).send({ msg: "Lessee(s) are not allowed to change status of listing" });
  }

  const listingExist = await listing.findById(id);
  if (!listingExist) {
    return res.status(404).send({ msg: "Listing not found" });
  }

  if (listingExist && listingExist.lessor.toString() !== _id && accountType !== "Admin") {
    return res.status(422).send({ msg: "You are not allowed to change status of this listing" });
  }

  const newStatus = !listingExist.status;
  await listing.updateOne(
    { _id: id },
    {
      status: newStatus,
    }
  );

  return res.status(200).send({ status: !listingExist.status });
};

module.exports = {
  getById,
  myListings,
  getAllListings,
  addListing,
  deleteListing,
  updateListing,
  toggleListingStatus,
};
