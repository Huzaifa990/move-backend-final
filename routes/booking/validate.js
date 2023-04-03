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
  paymentMethod: yup.string().oneOf(["COD"]).required(),
});

module.exports.validateNewCard = yup.object({
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
  paymentMethod: yup.string().oneOf(["Stripe"]).required(),
});

module.exports.validateCardPayment = yup.object({
  attempt: yup.number().integer().min(1).required(),
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

module.exports.validateQuery = yup.object({
  page: yup
    .number()
    .integer()
    .min(0, "Page must be min 1.")
    .typeError("Page must be a number.")
    .required("Page is required.")
    .label("Page"),
  pageSize: yup
    .number()
    .integer()
    .min(10, "Page Size must be min 10.")
    .typeError("Page Size must be a number.")
    .required("Page Size is required.")
    .label("Page Size"),
});
