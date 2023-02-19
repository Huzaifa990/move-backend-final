const express = require("express");

const {
  login,
  signUp,
  updatePassword,
  forgotPassword,
  setPassword,
  activateAccount,
  updateName,
  updateEmail,
  // forgotPassword,
  // getById,
  // changePassword,
  // deleteProfile,
  // getPayment,
  // resetPassword,
} = require("../../controllers/auth");
const { ensureAuth, Validator } = require("../../middleware/ensure-auth");
const {
  validateLogin,
  validateSignUp,
  validateChangePassword,
  validateForgotPassword,
  validateSetPassword,
  validateName,
  validateEmail,
} = require("./validate");

const app = express.Router();

// app.get("/user", ensureAuth, getById);
app.post("/login", Validator(validateLogin, "body"), login);
app.post("/sign-up", Validator(validateSignUp, "body"), signUp);
app.put("/updatePassword", ensureAuth, Validator(validateChangePassword, "body"), updatePassword);
app.put("/updateName", ensureAuth, Validator(validateName, "body"), updateName);
app.put("/updateEmail", ensureAuth, Validator(validateEmail, "body"), updateEmail);
app.post("/forgotPassword", Validator(validateForgotPassword, "body"), forgotPassword);
app.put("/setPassword", Validator(validateSetPassword, "body"), setPassword);
app.put("/activateAccount", activateAccount);

// app.post("/delete-profile", Validator(validateDeleteProfile, "body"), ensureAuth, deleteProfile);
// app.get("/payment", ensureAuth, getPayment);

module.exports = app;
