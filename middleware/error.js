/* eslint-disable no-unused-vars */
const winston = require("winston");

module.exports = (error, req, res, next) => {
  winston.error(error.message, error);
  res.status(500).send({ msg: "Something went wrong!" });
};

module.exports.dbError = (error, req, res, next) => {
  try {
    switch (Number(error?.code)) {
      case 11000:
        return res.status(500).send({
          key: Object.keys(error.keyPattern)[0],
          message: `${Object.keys(error.keyPattern)[0]} already Exists`,
        });
    }
    switch (error.name) {
      case "ValidationError":
        let errors = [];
        Object.values(error.errors).map((err) => {
          if (err.name === "ValidatorError") {
            errors.push({
              key: err.path,
              message: `Invalid value for ${err.path}`,
            });
          }
        });
        return res.status(500).send(errors);
    }
  } catch (e) {
    console.error("hello2", error);
    res.status(500).send({
      msg: "Something went wrong",
      ...(error.message && { error: error.message }),
    });
  }
};
