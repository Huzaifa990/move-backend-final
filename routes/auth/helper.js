const passwordPattern = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/);

module.exports = {
  passwordPattern,
};
