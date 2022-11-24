require("dotenv").config();
const jwt = require("jsonwebtoken");
const { accessLevel } = require("../utils/helper");

const ensureAuth = async (req, res, next) => {
  const token = req?.header("Authorization");

  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_KEY);

      (req.body._id = decoded._id),
        (req.body.forename = decoded.forename),
        (req.body.surname = decoded.surname),
        (req.body.type = decoded.type),
        (req.body.email = decoded.email),
        next();
    } catch (err) {
      return res.status(401).json({ msg: "Session Expired!" });
    }
  } else {
    return res.status(401).json({ msg: "Login Required!" });
  }
};

const ensureAccess = (user) => {
  return (req, res, next) => {
    const { role } = req.body;

    if (!role) {
      return res.status(403).send({ msg: "Role is missing!" });
    }

    const access = accessLevel(role, user);
    if (!access) {
      return res.status(401).send({ msg: "Access Denied!" });
    }

    next();
  };
};

const Validator = (schema, params) => {
  return async (req, res, next) => {
    const { error } = schema.validate(
      params === "body" ? req.body : params === "params" ? req.params : req.query,
      { abortEarly: false }
    );
    if (error) return res.status(422).send({ msg: "Invalid data", errors: error?.details });
    next();
  };
};

module.exports = { ensureAuth, ensureAccess, Validator };
