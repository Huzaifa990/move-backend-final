const { default: mongoose } = require("mongoose");
const listing = require("../../models/listing");

const getAllListings = async (req, res) => {
  const listings = await listing.find({});
  //need to add in filters
  return res.status(200).send({ count: listings.length, listings });
};

const addListing = async (req, res) => {
  const { carName, company, model, mileage, transmission, location, rentPerDay, picture } =
    req.body;
  const listedCar = new listing({
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

module.exports = {
  getById,
  getAllListings,
  addListing,
  deleteListing,
};
