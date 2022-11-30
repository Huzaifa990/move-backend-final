const yup = require("yup");

module.exports.validateContactUs = yup.object({
  name: yup.string().required().label("Name"),
  email: yup.string().email().required().label("Email"),
  subject: yup.string().required().label("Subject"),
  message: yup.string().required().label("Message"),
});
