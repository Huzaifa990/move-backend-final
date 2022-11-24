const yup = require("yup");
const { passwordPattern } = require("./helper");

module.exports.validateLogin = yup.object({
  email: yup.string().email().required().label("Email"),
  password: yup
    .string()
    .matches(
      passwordPattern,
      "Min Characters should be 8 with atleast one number, one lower and one upper case"
    )
    .required()
    .label("Password"),
});

module.exports.validateSignUp = yup.object({
  firstName: yup.string().required().label("First Name"),
  lastName: yup.string().required().label("Last Name"),
  email: yup.string().email().required().label("Email"),
  password: yup
    .string()
    .matches(
      passwordPattern,
      "Min Characters should be 8 with atleast one number, one lower and one upper case"
    )
    .required()
    .label("Password"),
  confirmPassword: yup
    .string()
    .matches(
      passwordPattern,
      "Min Characters should be 8 with atleast one number, one lower and one upper case"
    )
    .required()
    .label("Confirm Password"),
});
