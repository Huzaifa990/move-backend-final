require("dotenv").config();
const { nodeMailer } = require("../../utils/helper");

const contactUs = async (req, res) => {
  // Destructure the request body
  let { name, email, subject, message } = req.body;

  // Send an email using the nodeMailer function
  const emailSent = await nodeMailer({
    to: "f2019-529@bnu.edu.pk",
    subject,
    html: `<h2>${name} (${email}) reached you out. </h2><p>${message}</p>`,
  });

  // Return a success message to the client
  return res.status(200).send({ emailSent });
};

module.exports = {
  contactUs,
};
