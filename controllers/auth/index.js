const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const User = require("../../models/users");
const { nodeMailer } = require("../../utils/helper");

// This function handles the login process for a user
const login = async (req, res) => {
  // Destructure the email and password from the request body
  let { email, password } = req.body;
  // Convert the email to lowercase
  email = email.toLowerCase();

  // Find the user in the database using the email
  let user = await User.findOne({ email });
  // If the user is not found, return a 404 error with an error message
  if (!user) {
    return res.status(404).send({ msg: "Email not found!" });
  }

  // Compare the provided password with the hashed password stored in the database
  const valid = await bcrypt.compare(password, user.password);
  // If the passwords do not match, return a 404 error with an error message
  if (!valid) {
    return res.status(404).send({ msg: "Invalid Password Entered!" });
  }

  // Generate a JSON web token for the user
  const token = user.generateAuthToken();

  // Set the authorization header with the token and return a success message along with the user object
  return res.header("authorization", token).status(200).send({ msg: "Login Successful", user });
};

// This function handles the sign up process for a new user
const signUp = async (req, res) => {
  // Destructure the name, email, password, confirmPassword, and accountType from the request body
  let { name, email, password, confirmPassword, accountType } = req.body;

  // Convert the email to lowercase
  email = email.toLowerCase();

  // Check if there is already a user with the provided email in the database
  const emailCheck = await User.findOne({ email });

  // If a user with the provided email already exists, return a 402 error with an error message
  if (emailCheck) return res.status(402).send({ msg: "Email Already Exists!" });

  // If the provided password and confirmPassword do not match, return a 401 error with an error message
  if (password !== confirmPassword) {
    return res.status(401).send({ msg: "Passwords do not match!" });
  }

  // Create a new user object with the provided name, email, password, and accountType
  const user = new User({
    name,
    email,
    password,
    accountType,
  });
  // Save the user to the database
  await user.save();

  // Return a success message
  return res.status(200).send({ msg: "Sign Up Successful!" });
};

// This function handles the process of updating a user's password
const updatePassword = async (req, res) => {
  // Destructure the password, newPassword, and _id from the request body
  let { password, newPassword, _id } = req.body;

  // Check if the _id is a valid MongoDB ObjectId
  const valid = mongoose.isValidObjectId(_id);
  // If the _id is not valid, return a 404 error with an error message
  if (!_id || _id <= 0 || !valid) return res.status(404).send({ msg: "Invalid Id" });

  // Find the user in the database using the _id
  let user = await User.findById({ _id });
  // If the user is not found, return a 404 error with an error message
  if (!user) {
    return res.status(404).send({ msg: "User not found!" });
  }

  // Compare the provided password with the hashed password stored in the database
  const validPass = await bcrypt.compare(password, user.password);
  // If the passwords do not match, return a 402 error with an error message
  if (!validPass) {
    return res.status(402).send({ msg: "Invalid Current Password Entered!" });
  }

  // Update the user's password in the database
  let updateStatus = await User.updateOne({ _id }, { $set: { password: newPassword } });
  // If the update fails, return a 500 error with an error message
  if (!updateStatus) {
    return res.status(500).send("Update Failed");
  }

  // Return a success message
  res.status(200).send({ msg: "Password Updated Successfully." });
};

// This function handles the process of sending a password reset OTP to a user via email
const forgotPassword = async (req, res) => {
  // Destructure the email from the request body
  const { email } = req.body;

  // Find the user in the database using the email
  let user = await User.findOne({ email });
  // If the user is not found, return a 404 error with an error message
  if (!user) {
    return res.status(404).send({ msg: "No User Found!" });
  }

  // Generate a random OTP
  const otp = Math.floor(Math.random() * 1000000000000);

  // Update the user's OTP in the database
  await User.findOneAndUpdate(
    { email },
    {
      otp,
    }
  );

  // Send the OTP to the user via email using the nodeMailer function
  const emailSent = await nodeMailer({
    to: `${email}`,
    subject: "Reset Your Move Account Password",
    html: `<h1>Hey There! Reset Password Using this link: ${process.env.DOMAIN}/reset?otp=${otp}</h1>`,
  });

  // Return a success message and the emailSent object
  res.status(200).send({ msg: "Emai Sent Successfully", emailSent });
};

// This function handles the process of resetting a user's password using an OTP
const setPassword = async (req, res) => {
  // Destructure the otp and password from the request body
  let { otp, password } = req.body;
  // Find the user in the database using the otp
  const user = await User.findOne({ otp });
  // If the user is not found, return a 422 error with an error message
  if (!user) {
    return res.status(422).send({ msg: "OTP Link Expired!" });
  }

  // Update the user's password in the database and remove the OTP field
  await User.updateOne(
    { otp },
    {
      $set: { password },
      $unset: { otp: 1 },
    }
  );

  // Return a success message
  res.status(200).send({ msg: "Password Reset Successful!" });
};

module.exports = {
  login,
  signUp,
  updatePassword,
  forgotPassword,
  setPassword,
};
