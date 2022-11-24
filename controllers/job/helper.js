const { s3Bucket } = require("../../utils/s3");
const { checkValidFileTypes, uploadPDFToS3 } = require("../../utils/helper");
const countryCityList = require("../../utils/json/countries+states+cities.json");
const moment = require("moment/moment");

const uploadFile = async ({ image, jobId, userId }) => {
  const checkedFile = checkValidFileTypes({
    base64: image,
    validFileTypes: ["png", "jpg", "jpeg", "webp"],
  });
  if (image && !checkedFile.valid) {
    throw new Error("Invalid Image Types!");
  }

  const buf = (type) => Buffer.from(image.replace(`data:${type};base64,`, ""), "base64");

  const url = await uploadPDFToS3({
    key: `${userId}-${jobId}-company`,
    buf: buf(checkedFile.type),
    ContentType: checkedFile.type,
  });

  return url;
};

const deleteImage = async ({ jobId, userId }) => {
  s3Bucket.deleteObject({ Key: `${userId}-${jobId}-company` }, (err) => {
    if (err) throw new Error(err);
  });
};

const validateCity = (country, city) => {
  const citiesList = [];
  countryCityList
    ?.find((x) => x.name === country)
    ?.states.forEach((x) => citiesList.push(...x.cities.map((x) => x.name)));
  if (!citiesList.includes(city)) {
    throw new Error("Invalid City Name Entered");
  }
};

const salaryOptions = [
  "",
  { min: 0, max: 1500 },
  { min: 1501, max: 3000 },
  { min: 3001, max: 5000 },
  { min: 5001, max: 10000 },
  { min: 10001, max: 15000 },
  { min: 15001 },
];

const handleSingleJobMapping = (newJob, interestedJobIds) => {
  const data = {
    ...newJob,
    interested: interestedJobIds.includes(newJob?._id.toString()),
    overview: [
      { key: "Company Size", value: newJob.companyInfo?.companySize || "" },
      { key: "Company Type", value: newJob.companyInfo?.companyType || "" },
      { key: "Employment Type", value: newJob?.employmentType || "" },
      { key: "Current Location", value: newJob.positionInfo?.homeBase?.country || "" },
      {
        key: "Competition Location",
        value: `${newJob.positionInfo?.competition?.country}`,
      },
      {
        key: "Professional Equine Experience",
        value: newJob?.preferredCandidate?.professionalExperience || "",
      },
      {
        key: "Team Couple",
        value: newJob?.preferredCandidate?.team || "",
      },
      {
        key: "Posted",
        value: moment(newJob?.createdAt).format("Do MMM YYYY") || "",
      },
    ],
  };

  return data;
};

const activePostsFrontEndFormat = (jobs) => {
  const { _id, jobFilledStatus, jobId, jobTitle, positionInfo, createdAt } = jobs;

  return {
    _id,
    jobTitle,
    jobFilledStatus,
    image: positionInfo?.image,
    list: [
      `Job ID #${jobId}`,
      `${moment(new Date(createdAt)).format("Do MMMM YYYY")}`,
      `21 days remaining`,
    ],
  };
};

module.exports = {
  uploadFile,
  deleteImage,
  salaryOptions,
  validateCity,
  handleSingleJobMapping,
  activePostsFrontEndFormat,
};
