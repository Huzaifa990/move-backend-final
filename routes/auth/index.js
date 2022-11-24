const express = require("express");

const {
  login,
  signUp,
  forgotPassword,
  getById,
  changePassword,
  deleteProfile,
  getPayment,
  resetPassword,
} = require("../../controllers/auth");
const { ensureAuth, Validator } = require("../../middleware/ensure-auth");
const {
  validateLogin,
  validateSignup,
  validateForgetPass,
  validateChangePassword,
  validateDeleteProfile,
  validateResetPassword,
} = require("./validate");

const app = express.Router();

app.get("/user", ensureAuth, getById);
app.post("/login", Validator(validateLogin, "body"), login);
app.post("/sign-up", Validator(validateSignup, "body"), signUp);
app.post("/forgot", Validator(validateForgetPass, "body"), forgotPassword);
app.post("/change-password", Validator(validateChangePassword, "body"), ensureAuth, changePassword);
app.post("/reset-password", Validator(validateResetPassword, "body"), resetPassword);
app.post("/delete-profile", Validator(validateDeleteProfile, "body"), ensureAuth, deleteProfile);
app.get("/payment", ensureAuth, getPayment);

module.exports = app;
