const Advertiser = require("../../models/advertisers");

const postAdvertisers = async (req, res) => {
  const { body } = req;

  const emailFound = await Advertiser.findOne({ email: body.email });
  if (emailFound) {
    return res.status(409).send({ msg: "Email already exists!" });
  }

  const phoneFound = await Advertiser.findOne({ businessPhone: body.businessPhone });
  if (phoneFound) {
    return res.status(409).send({ msg: "Business Phone number already exists!" });
  }

  body.equestrian = body.equestrian === "Yes" ? true : false;

  const advertiser = new Advertiser({
    ...body,
  });
  await advertiser.save();
  return res.status(200).send({ advertiser });
};

module.exports = { postAdvertisers };
