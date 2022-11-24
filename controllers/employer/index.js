const User = require("../../models/users");
const Employer = require("../../models/employers");

const { s3Bucket } = require("../../utils/s3");
const { checkValidFileTypes, uploadPDFToS3 } = require("../../utils/helper");

const personalDetails = async (req, res) => {
  const userId = req.body._id;
  let profilePictureURL;
  let {
    personalDetails: {
      firstName,
      lastName,
      email,
      companyName,
      numberOfHorses,
      businessAddress,
      phoneNumber,
      profilePicture,
    },
  } = req.body;

  email = email.toLowerCase();

  const user = await User.findById(userId);
  if (!user) {
    return res.status(409).send({ msg: "User does not exists" });
  }

  const employer = await Employer.findOne({ userId });
  if (!employer) {
    return res.status(409).send({ msg: "Employer does not exists" });
  }

  if (user.type != "employer") {
    return res.status(409).send({ msg: "User is not an employer" });
  }

  if (profilePicture) {
    const checkedFile = checkValidFileTypes({
      base64: profilePicture,
      validFileTypes: ["jpg", "jpeg", "png"],
    });

    if (profilePicture && !checkedFile.valid) {
      throw new Error("Invalid File Types!");
    }

    const buf = Buffer.from(
      profilePicture
        .replace("data:image/png;base64,", "")
        .replace("data:image/jpg;base64,", "")
        .replace("data:image/jpeg;base64,", ""),
      "base64"
    );

    profilePictureURL = await uploadPDFToS3({
      key: `${Math.floor(Math.random() * 10000000000000)}-${userId}-employer-picture`,
      ContentType: checkedFile.type,
      buf,
    });

    if (employer?.personalDetails?.profilePicture) {
      s3Bucket.deleteObject({ Key: employer?.personalDetails?.profilePicture }, (err) => {
        if (err) throw new Error(err);
      });
    }
  }

  const updatedEmployer = await Employer.findOneAndUpdate(
    { userId },
    {
      personalDetails: {
        firstName,
        lastName,
        email,
        companyName,
        numberOfHorses,
        businessAddress,
        phoneNumber,
        profilePicture: profilePictureURL || employer?.personalDetails?.profilePicture,
      },
    },
    {
      upsert: true,
      new: true,
    }
  );

  const filter = { _id: userId };
  await User.findOneAndUpdate(filter, {
    forename: updatedEmployer.personalDetails.firstName,
    surname: updatedEmployer.personalDetails.lastName,
  });

  return res.status(200).send({ updatedEmployer });
};

const settings = async (req, res) => {
  const userId = req.body._id;
  const { emailAlerts, shortListedCandidates } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(409).send({ msg: "User does not exists" });
  }

  const updatedEmployer = await Employer.findOneAndUpdate(
    { userId },
    {
      emailAlerts,
      shortListedCandidates,
    },
    {
      upsert: true,
      new: true,
    }
  );

  return res.status(200).json({
    emailAlerts: updatedEmployer.emailAlerts ? updatedEmployer.emailAlerts : false,
    shortListedCandidates: updatedEmployer.shortListedCandidates
      ? updatedEmployer.shortListedCandidates
      : false,
  });
};

module.exports = {
  personalDetails,
  settings,
};
