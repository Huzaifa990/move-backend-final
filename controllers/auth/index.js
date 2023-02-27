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
    return res.status(422).send({ msg: "Invalid Password Entered!" });
  }

  if (user.emailVerified === false)
    return res.status(422).send({
      msg: "Please verify your email!",
    });

  if (user.status === false)
    return res.status(422).send({
      msg: "Your Account is deactivated, for activation please contact Admin!",
    });

  const token = user.generateAuthToken();

  return res.header("authorization", token).status(200).send({ msg: "Login Successful", user });
};

const signUp = async (req, res) => {
  let { name, email, password, confirmPassword, accountType, profilePicture, cnic, phoneNumber } =
    req.body;

  email = email.toLowerCase();
  const emailCheck = await User.findOne({ email });
  if (emailCheck) return res.status(402).send({ msg: "Email Already Exists!" });

  const cnicCheck = await User.findOne({ cnic });
  if (cnicCheck && cnicCheck.accountType === accountType)
    return res.status(402).send({ msg: "CNIC Already Exists!" });

  const phoneCheck = await User.findOne({ phoneNumber });
  if (phoneCheck && phoneCheck.accountType === accountType)
    return res.status(402).send({ msg: "Phone Number Already Exists!" });

  if (password !== confirmPassword) {
    return res.status(401).send({ msg: "Passwords do not match!" });
  }

  const otp = Math.floor(Math.random() * 1000000000000);

  const user = new User({
    name,
    email,
    password,
    accountType,
    otp,
    ...(profilePicture && { profilePicture }),
    cnic,
    phoneNumber,
  });
  await user.save();

  const emailSent = await nodeMailer({
    to: `${email}`,
    subject: "Welcome To MOVE",
    html: `<h1>Welcome! Verify Email Using this link: ${process.env.DOMAIN}/activateAccount?otp=${otp}</h1>`,
  });

  return res.status(200).send({
    msg: "Link to setup password has been sent to entered email!",
    emailSent,
  });
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

const updateName = async (req, res) => {
  let { updatedName, _id } = req.body;

  const valid = mongoose.isValidObjectId(_id);
  if (!_id || _id <= 0 || !valid) return res.status(404).send({ msg: "Invalid Id" });

  let user = await User.findById({ _id });
  if (!user) {
    return res.status(404).send({ msg: "User not found!" });
  }

  if (updatedName == "") {
    return res.status(422).send({ msg: "Please enter a valid name!" });
  }

  await User.findOneAndUpdate(
    { _id },
    {
      name: updatedName,
    }
  );

  res.status(200).send({ msg: "Name Updated Successfully." });
};

const updateEmail = async (req, res) => {
  let { updatedEmail, _id } = req.body;

  const valid = mongoose.isValidObjectId(_id);
  if (!_id || _id <= 0 || !valid) return res.status(404).send({ msg: "Invalid Id" });

  let user = await User.findById({ _id });
  if (!user) {
    return res.status(404).send({ msg: "User not found!" });
  }

  updatedEmail = updatedEmail.toLowerCase();
  const emailExists = await User.findOne({ email: updatedEmail });
  if (emailExists && emailExists._id.toString() !== _id) {
    return res.status(422).send({ msg: "Email already exists!" });
  }

  const otp = Math.floor(Math.random() * 1000000000000);
  await User.findOneAndUpdate(
    { _id },
    {
      otp,
      email: updatedEmail,
      emailVerified: false,
    }
  );

  const emailSent = await nodeMailer({
    to: `${updatedEmail}`,
    subject: "Update your MOVE account Password",
    html: `<h1>Verify Email Using this link: ${process.env.DOMAIN}/activateAccount?otp=${otp}</h1>`,
  });

  return res.status(200).send({
    msg: "Please verify your updated email!",
    emailSent,
  });
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

const activateAccount = async (req, res) => {
  let { otp } = req.body;
  const user = await User.findOne({ otp });
  if (!user) {
    return res.status(422).send({ msg: "OTP Link Expired!" });
  }

  await User.findOneAndUpdate(
    { otp },
    {
      emailVerified: true,
      $unset: { otp: 1 },
    }
  );

  res.status(200).send({ msg: "Account Activated Successfully" });
};

const uploadCNIC = async (req, res) => {
  let { cnicImages, _id } = req.body;

  const valid = mongoose.isValidObjectId(_id);
  if (!_id || _id <= 0 || !valid) return res.status(404).send({ msg: "Invalid Id" });

  let user = await User.findById({ _id });
  if (!user) {
    return res.status(404).send({ msg: "User not found!" });
  }

  if (user.verified === true) {
    return res.status(422).send({ msg: "Your account is already verified!" });
  }

  await User.findOneAndUpdate(
    { _id },
    {
      ...(cnicImages && { cnicImages }),
    }
  );

  return res
    .status(200)
    .send({ msg: "Images uploaded, please wait for verification to complete in next 48 hours" });
};

module.exports = {
  login,
  signUp,
  updateName,
  updateEmail,
  updatePassword,
  forgotPassword,
  setPassword,
  uploadCNIC,
  activateAccount,
};
