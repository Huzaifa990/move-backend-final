const listing = require("../../models/listing");

const getAllListings = async (req, res) => {
  //   const listedCar = new listing({
  //     carName: "ALto",
  //     company: "Suzuki",
  //     model: 2019,
  //     mileage: 35000,
  //     transmission: "manual",
  //     location: "Lahore",
  //     rentPerDay: 3000,
  //     picture:
  //       "https://cache4.pakwheels.com/system/car_generation_pictures/4989/original/Alto_2019_Exterior-5.jpg?1560326906",
  //   });
  //   await listedCar.save();

  const listings = await listing.find({});
  return res.status(200).send({ count: listings.length, listings });
};

module.exports = {
  getAllListings,
};
