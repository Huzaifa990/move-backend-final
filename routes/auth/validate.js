const yup = require("yup");
const { passwordPattern, base64ImgPattern } = require("./helper");

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
  profilePicture: yup
    .string()
    .matches(base64ImgPattern, "Uploaded File Must Be An Image")
    .label("Profile Picture"),
  cnic: yup
    .number()
    .integer()
    .min(1000000000000, "CNIC length must be 13 digits")
    .max(9999999999999, "CNIC length must be 13 digits")
    .required()
    .label("CNIC"),
  phoneNumber: yup
    .number()
    .integer()
    .min(100000000000, "Phone length must be 12 digits")
    .max(999999999999, "Phone length must be 12 digits")
    .required()
    .label("Phone Number"),
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

module.exports.validateName = yup.object({
  updatedName: yup.string().required().label("Name"),
});

module.exports.validateEmail = yup.object({
  updatedEmail: yup.string().email().required().label("Email"),
});

module.exports.validateSetPassword = yup.object({
  otp: yup.string().required().label("OTP"),
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
    .oneOf([yup.ref("password"), null], "Passwords Do Not Match")
    .required()
    .label("Confirm Password"),
});
