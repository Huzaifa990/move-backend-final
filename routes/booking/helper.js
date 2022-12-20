module.exports.dateTimePattern = new RegExp(
  "^[0-2]{1}[0-9]{3}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):00Z$"
);
module.exports.mongoIdPattern = new RegExp(/^[a-f\d]{24}$/);
