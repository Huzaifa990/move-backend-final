const moment = require("moment");
const { default: mongoose } = require("mongoose");
const listing = require("../../models/listing");

const getAllListings = async (req, res) => {
  const listings = await listing.find({ status: true, approved: "Accepted" });
  //need to add in filters
  return res.status(200).send({ count: listings.length, listings });
};

const addListing = async (req, res) => {
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
    carNum,
    accountType,
    fuelEconomy,
    description,
  } = req.body;

  if (accountType === "Lessee") {
    return res.status(402).send({ msg: "This Account Cannot Add A Listing" });
  }

  const checkCarNum = await listing.findOne({
    carNum: { $regex: new RegExp("^" + carNum + "$", "i") },
  });
  if (checkCarNum) {
    return res.status(422).send({ msg: "Listing with same car number already exists" });
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
    carNum,
    fuelEconomy,
    picture,
    description,
  });
  await listedCar.save();

  //need to cater admin side.. initially verified: false should be there...

  return res.status(200).send({ msg: "Listing Added Successfully" });
};

const deleteListing = async (req, res) => {
  const { id } = req.params;

  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) {
    return res.status(403).send({ msg: "Invalid Id" });
  }

  const getById = await listing.findById(id);
  if (!getById) {
    return res.status(422).send({ msg: "No Such Listing Found!" });
  }

  await listing.deleteOne({ _id: id });

  res.status(200).send({ msg: "Listing Deleted Successfully!" });
};

const getById = async (req, res) => {
  const id = req.params.id;

  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  const item = await listing.findById(id);
  if (!item) {
    return res.status(422).send({ msg: "No Such Listing Found!" });
  }

  res.status(200).send({ item });
};

const updateListing = async (req, res) => {
  const {
    carName,
    company,
    model,
    mileage,
    transmission,
    carNum,
    location,
    rentPerDay,
    picture,
    description,
  } = req.body;

  const id = req.params.id;
  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  const item = await listing.findById(id);
  if (!item) {
    return res.status(422).send({ msg: "No Such Listing Found!" });
  }

  const checkCarNum = await listing.findOne({ carNum: carNum });
  if (checkCarNum && checkCarNum._id.toString() !== id) {
    return res.status(422).send({ msg: "Listing with same car number already exists" });
  }

  // Update the listing
  await listing.updateOne(
    { _id: id },
    {
      carName,
      company,
      model,
      mileage,
      carNum,
      transmission,
      location,
      rentPerDay,
      picture,
      fuelEconomy,
      description,
      // verified: false,
    }
  );

  //need to cater admin side.. when will a listing go under reverification (in case of rentPerDay changed or location changed, or car details like model, name, company changed etc)

  return res.status(200).send({ msg: "Listing Updated Successfully!" });
};

const myListings = async (req, res) => {
  const { _id } = req.body;

  const listings = await listing.find({ lessor: _id });

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

  if (listingExist.approved == "Rejected") {
    return res.status(422).send({ msg: "Rejected listing cannot be activated" });
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

const verifyLessorListing = async (req, res) => {
  const id = req.params.id;
  const { accountType } = req.body;
  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  if (accountType !== "Admin") {
    return res.status(422).send({ msg: "You are not allowed to approve a listing" });
  }

  const listingExist = await listing.findById(id);
  if (!listingExist) {
    return res.status(404).send({ msg: "Listing not found" });
  }

  if (listingExist.approved == true) {
    return res.status(200).send({ msg: "Listing Already Approved!" });
  }

  await listing.updateOne(
    { _id: id },
    {
      approved: "Accepted",
    }
  );

  return res.status(200).send({ msg: "Listing Approved Successfully" });
};

const rejectLessorListing = async (req, res) => {
  const id = req.params.id;
  const { accountType } = req.body;
  const valid = mongoose.isValidObjectId(id);
  if (!id || id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  if (accountType !== "Admin") {
    return res.status(422).send({ msg: "You are not allowed to reject a listing" });
  }

  const listingExist = await listing.findById(id);
  if (!listingExist) {
    return res.status(404).send({ msg: "Listing not found" });
  }

  if (listingExist.approved == "Accepted") {
    return res.status(200).send({ msg: "Approved listing cannot be rejected!" });
  }

  if (listingExist.approved == "Rejected") {
    return res.status(200).send({ msg: "Listing Already Rejected!" });
  }

  await listing.updateOne(
    { _id: id },
    {
      approved: "Rejected",
      status: false,
    }
  );

  return res.status(200).send({ msg: "Listing Rejected Successfully" });
};

module.exports = {
  getById,
  myListings,
  getAllListings,
  addListing,
  deleteListing,
  updateListing,
  toggleListingStatus,
  verifyLessorListing,
  rejectLessorListing,
};
