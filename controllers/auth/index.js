const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const User = require("../../models/users");
const { nodeMailer } = require("../../utils/helper");

const login = async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ msg: "Email not found!" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(404).send({ msg: "Invalid Password Entered!" });
  }

  const token = user.generateAuthToken();

  return res.header("authorization", token).status(200).send({ msg: "Login Successful", user });
};

const signUp = async (req, res) => {
  const { name, email, password, confirmPassword, accountType } = req.body;

  const emailCheck = await User.findOne({ email });
  if (emailCheck) return res.status(402).send({ msg: "Email Already Exists!" });

  if (password !== confirmPassword) {
    return res.status(401).send({ msg: "Passwords do not match!" });
  }

  const user = new User({
    name,
    email,
    password,
    accountType,
  });
  await user.save();

  return res.status(200).send({ msg: "Sign Up Successful!" });
};

const updatePassword = async (req, res) => {
  let { password, newPassword, _id } = req.body;

  const valid = mongoose.isValidObjectId(_id);
  if (!_id || _id <= 0 || !valid) return res.status(404).send({ msg: "Invalid Id" });

  let user = await User.findById({ _id });
  if (!user) {
    return res.status(404).send({ msg: "User not found!" });
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(402).send({ msg: "Invalid Current Password Entered!" });
  }

  let updateStatus = await User.updateOne({ _id }, { $set: { password: newPassword } });
  if (!updateStatus) {
    return res.status(500).send("Update Failed");
  }

  res.status(200).send({ msg: "Password Updated Successfully." });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ msg: "No User Found!" });
  }

  const otp = Math.floor(Math.random() * 1000000000000);

  await User.findOneAndUpdate(
    { email },
    {
      otp,
    }
  );

  const emailSent = await nodeMailer({
    to: `${email}`,
    subject: "Reset Your Move Account Password",
    html: `<h1>Hey There! Reset Password Using this link: ${process.env.DOMAIN}/reset?otp=${otp}</h1>`,
  });

  res.status(200).send({ msg: "Emai Sent Successfully", emailSent });
};

const setPassword = async (req, res) => {
  let { otp, password } = req.body;
  const user = await User.findOne({ otp });
  if (!user) {
    return res.status(422).send({ msg: "OTP Link Expired!" });
  }

  await User.updateOne(
    { otp },
    {
      $set: { password },
      $unset: { otp: 1 },
    }
  );

  res.status(200).send({ msg: "Password Reset Successful!" });
};

module.exports = {
  login,
  signUp,
  updatePassword,
  forgotPassword,
  setPassword,
};
