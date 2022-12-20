const yup = require("yup");
const { dateTimePattern, mongoIdPattern } = require("./helper");

module.exports.validateNew = yup.object({
  car: yup
    .string()
    .matches(mongoIdPattern, "Listing Id Must Be Valid")
    .required()
    .label("Car Listing"),
  pickupDate: yup
    .string()
    .matches(dateTimePattern, "Date Time must in format YYYY-MM-DDTHH:00Z")
    .required()
    .label("Pickup Date"),
  dropOffDate: yup
    .string()
    .matches(dateTimePattern, "Date Time must in format YYYY-MM-DDTHH:MMZ")
    .required()
    .label("Drop Off Date"),
  paymentMethod: yup.string().oneOf(["COD", "Stripe"]).required(),
});

module.exports.validateUpdate = yup.object({
  car: yup
    .string()
    .matches(mongoIdPattern, "Listing Id Must Be Valid")
    .required()
    .label("Car Listing"),
  pickupDate: yup
    .string()
    .matches(dateTimePattern, "Date Time must in format YYYY-MM-DDTHH:00Z")
    .required()
    .label("Pickup Date"),
  dropOffDate: yup
    .string()
    .matches(dateTimePattern, "Date Time must in format YYYY-MM-DDTHH:MMZ")
    .required()
    .label("Drop Off Date"),
  paymentMethod: yup.string().oneOf(["COD", "Stripe"]).required(),
});
