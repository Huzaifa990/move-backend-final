const Joi = require("joi");
const { namePattern } = require("../../utils/validate");
const { telCodes, entities, validatePass, validatePassMsg, validateNameMsg } = require("./helper");

module.exports.validateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(validatePass).message(validatePassMsg("Password")).required(),
});

module.exports.validateForgetPass = Joi.object({
  email: Joi.string().email().required(),
});

module.exports.validateChangePassword = Joi.object({
  newPassword: Joi.string()
    .pattern(validatePass)
    .message(validatePassMsg("Password"))
    .required()
    .label("New Password"),
});

module.exports.validateResetPassword = Joi.object({
  token: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string()
    .pattern(validatePass)
    .message(validatePassMsg("Password"))
    .required()
    .label("Password"),
});

module.exports.validateDeleteProfile = Joi.object({
  password: Joi.string().optional(),
});

module.exports.validateSignup = Joi.alternatives().conditional(
  Joi.object({ type: "candidate" }).unknown(),
  {
    then: Joi.object({
      type: Joi.string().required(),
      forename: Joi.string()
        .pattern(namePattern)
        .message(validateNameMsg("Forename"))
        .required()
        .label("Forename"),
      surname: Joi.string()
        .pattern(namePattern)
        .message(validateNameMsg("Surname"))
        .required()
        .label("Surname"),
      email: Joi.string().email().required().label("Email"),
      password: Joi.string()
        .pattern(validatePass)
        .message(validatePassMsg("Password"))
        .required()
        .label("Password"),
      newsLetter: Joi.boolean().valid(true).required().label("News Letter"),
      terms: Joi.boolean().valid(true).required().label("Terms"),
    }),
    otherwise: Joi.alternatives().conditional(Joi.object({ type: "employer" }).unknown(), {
      then: Joi.object({
        type: Joi.string().required(),
        forename: Joi.string()
          .pattern(namePattern)
          .message(validateNameMsg("Forename"))
          .required()
          .label("Forename"),
        surname: Joi.string()
          .pattern(namePattern)
          .message(validateNameMsg("Surname"))
          .required()
          .label("Surname"),
        entity: Joi.string()
          .valid(...entities)
          .required()
          .label("Entity"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string()
          .pattern(validatePass)
          .message(validatePassMsg("Password"))
          .required()
          .label("Password"),
        telCode: Joi.string()
          .valid(...telCodes)
          .required()
          .label("Country Code"),
        telephone: Joi.string()
          .pattern(new RegExp(/^[0-9]{8,15}$/i))
          .message("Invalid telephone number: must contain 8 to 15 digits")
          .required()
          .label("Phone"),
        companyName: Joi.string().min(1).max(25).required().label("Company Name"),
        businessAddress: Joi.string().min(15).required().label("Business Address"),
        newsLetter: Joi.boolean().valid(true).required().label("News Letter"),
        terms: Joi.boolean().valid(true).required().label("Terms"),
      }),
    }),
  }
);
