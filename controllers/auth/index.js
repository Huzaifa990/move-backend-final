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
  console.log(req.body);
  let { password, newPassword, _id } = req.body;

  const valid = mongoose.isValidObjectId(_id);
  if (!_id || _id <= 0 || !valid) return res.status(400).send({ msg: "Invalid Id" });

  let user = await User.findById({ _id });
  if (!user) {
    return res.status(404).send({ msg: "User not found!" });
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(404).send({ msg: "Invalid Current Password Entered!" });
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

// const resetPassword = async (req, res) => {
//   let { token, password } = req.body;

//   const decoded = await jwt.verify(token, process.env.JWT_KEY);

//   if (!decoded?.email) {
//     return res.status(400).send({ msg: "Invalid Rest Password Link Provided" });
//   }

//   const email = decoded?.email?.toLowerCase();

//   let user = await User.findOne({ email });
//   if (!user) {
//     return res.status(404).send({ msg: "Invalid email!" });
//   }

//   let updateStatus = await User.updateOne({ email }, { $set: { password } }); //pre function updates pass to encrypted pass
//   if (!updateStatus) {
//     return res.status(500).send("Update Failed");
//   }

//   res.status(200).send({ msg: "Password Updated Successfully." });
// };

// const deleteProfile = async (req, res) => {
//   const { _id, type, password } = req.body;
//   let user = await User.findById(_id);
//   if (!user) {
//     return res.status(404).send({ msg: "Invalid User!" });
//   }

//   if (!ObjectId.isValid(_id)) {
//     return res.status(404).send({ msg: "Invalid User Id!" });
//   }

//   if (password) {
//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) {
//       return res.status(404).send({ msg: "Invalid Password Entered!" });
//     }
//   }

//   if (type === "employer") {
//     await Employer.deleteOne({ userId: _id });
//   }
//   if (type == "candidate") {
//     await Candidate.deleteOne({ userId: _id });
//   }

//   await User.deleteOne({ _id });

//   const userDelCheck = await User.findOne({ _id });
//   if (userDelCheck) {
//     return res.status(404).send({ msg: "User wasn't deleted successfully" });
//   }

//   res.status(200).send({ msg: "Profile Deleted Successfully" });
// };

// const getById = async (req, res) => {
//   let user = null;
//   let candidate = null;
//   let employer = null;
//   let { _id, email } = req.body;

//   email = email?.toLowerCase();

//   if (!_id || _id <= 0) {
//     return res.status(401).send({ msg: "Id not present!" });
//   }

//   user = await User.findById(_id);
//   if (!user) {
//     return res.status(404).send({ msg: "User does not exists!" });
//   }

//   user = user.toObject();

//   if (user.type === "candidate") {
//     candidate = await Candidate.findOne({ userId: user._id }, "uploads");
//     if (!candidate) {
//       return res.status(404).send({ msg: "Candidate does not exists." });
//     }
//     user.candidateId = candidate._id;
//     user.candidate = candidate;
//   }
//   if (user.type === "employer") {
//     employer = await Employer.findOne({ userId: user._id });
//     if (!employer) {
//       return res.status(404).send({ msg: "Employer does not exists." });
//     }
//     user.employer = employer;
//     let subscription = await Subscription.findOne({ email });
//     if (subscription) {
//       subscription =
//         subscription?.id?.includes("pi") &&
//         subscription?.amount === 500 &&
//         moment().isBefore(subscription?.expiry)
//           ? "active"
//           : (await stripe?.subscriptions?.retrieve(subscription?.id))?.status;
//     }
//     user.subscriptionStatus = subscription || "inActive";
//   }
//   res.status(200).json(user);
// };

// const getPayment = async (req, res) => {
//   const { number, exp_month, exp_year, cvc } = req.body;

//   if (req.body.type !== "employer") {
//     res.status(409).send("User is not an Employer");
//   } else {
//     var token = await stripe.tokens.create({
//       card: { number, exp_month, exp_year, cvc },
//     });
//     if (!token) {
//       res.status(409).send("Card details not entered correctly");
//     }
//     var customer = await stripe.customers.create({
//       email: req.body.email.toLowerCase(),
//       name: `${req.body.forename} ${req.body.surname}`,
//       source: token.id,
//     });
//   }

//   const charge = await stripe.charges.create({
//     amount: 600,
//     currency: "usd",
//     source: token.card.id,
//     customer: customer.id,
//     description: "One time registration fee",
//   });
//   if (!charge) {
//     res.status(409).send("Payment not successful");
//   } else {
//     res.status(200).send("Payment successful");
//   }
// };

module.exports = {
  login,
  signUp,
  updatePassword,
  forgotPassword,
  // getById,
  // getPayment,
  // resetPassword,
  // deleteProfile,
};
