const yup = require("yup");
const { passwordPattern } = require("./helper");

module.exports.validateLogin = yup.object({
  email: yup.string().email().required().label("Email"),
  password: yup.string().matches(passwordPattern, "Invalid Password").required().label("Password"),
});

module.exports.validateSignUp = yup.object({
  name: yup.string().required().label("Name"),
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
  accountType: yup.string().oneOf(["Lessor", "Lessee"]).required().label("Account Type"),
});

module.exports.validateChangePassword = yup.object({
  password: yup.string().matches(passwordPattern, "Invalid Password").required().label("Password"),
  newPassword: yup
    .string()
    .matches(passwordPattern, "Invalid Password")
    .required()
    .label("New Password"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords Do Not Match")
    .required()
    .label("Confirm New Password"),
});

module.exports.validateForgotPassword = yup.object({
  email: yup.string().email().required().label("Email"),
});
