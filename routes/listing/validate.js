const yup = require("yup");
const { citiesInPak, base64ImgPattern, listingNumber } = require("./helper");

const maxValue = parseInt(new Date().getFullYear());

module.exports.validateNew = yup.object({
  carName: yup.string().required().label("Car Name"),
  company: yup.string().required().label("Company"),
  model: yup
    .number()
    .integer()
    .required()
    .min(1980, "Model to be greater than 1980")
    .max(maxValue)
    .label("Model"),
  mileage: yup.number().integer().required().min(0).max(500000).label("Mileage"),
  transmission: yup.string().oneOf(["auto", "manual"]).required().label("Transmission"),
  location: yup.string().oneOf(citiesInPak).required().label("Location"),
  rentPerDay: yup.number().integer().required().min(1000).label("Rent Per Day"),
  picture: yup
    .array()
    .of(yup.string().matches(base64ImgPattern, "Uploaded File Must Be An Image"))
    .label("Picture"),
  carNum: yup
    .string()
    .matches(listingNumber, "Car Number can only contain alphabets and digits eg AAA111")
    .required()
    .typeError("Car Number can only contain alphabets and digits eg AAA111")
    .label("Car Number"),
  fuelEconomy: yup
    .number()
    .required()
    .min(1)
    .label("Fuel Economy")
    .typeError("Fuel Economy must be a number"),
});

module.exports.validateUpdate = yup.object({
  carName: yup.string().required().label("Car Name"),
  company: yup.string().required().label("Company"),
  model: yup
    .number()
    .integer()
    .required()
    .min(1980, "Model to be greater than 1980")
    .max(maxValue)
    .label("Model"),
  mileage: yup.number().integer().required().min(0).max(500000).label("Mileage"),
  transmission: yup.string().oneOf(["auto", "manual"]).required().label("Transmission"),
  location: yup.string().oneOf(citiesInPak).required().label("Location"),
  rentPerDay: yup.number().integer().required().min(1000).label("Rent Per Day"),
  picture: yup
    .array()
    .of(yup.string().matches(base64ImgPattern, "Uploaded File Must Be An Image"))
    .label("Picture"),
  carNum: yup.string().required().label("Car Number"),
  fuelEconomy: yup
    .number()
    .required()
    .min(1)
    .label("Fuel Economy")
    .typeError("Fuel Economy must be a number"),
});
