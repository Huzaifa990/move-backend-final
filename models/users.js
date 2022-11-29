"use-strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
});

User.methods.generateAuthToken = function () {
  const maxAge = 3 * 24 * 60 * 60;
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      accountType: this.accountType,
      email: this.email,
    },
    process.env.JWT_KEY,
    {
      expiresIn: maxAge,
    }
  );
  return token;
};

User.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

User.pre("updateOne", function (next) {
  const password = this.getUpdate().$set.password;
  if (!password) {
    return next();
  }
  try {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    this.getUpdate().$set.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("users", User);
