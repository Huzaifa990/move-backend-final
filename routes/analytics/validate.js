const yup = require("yup");

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
