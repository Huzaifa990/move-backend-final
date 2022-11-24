const moment = require("moment");

const User = require("../../models/users");
const Candidates = require("../../models/candidates");
const JobAlerts = require("../../models/jobAlerts");
const Reference = require("../../models/references");

const { s3Bucket } = require("../../utils/s3");
const {
  mailer,
  uploadPDFToS3,
  uploadBufS3Wrapper,
  checkValidFileTypes,
} = require("../../utils/helper");

const validImageTypes = [
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/jpg",
  "image/gif",
  "image/x-png",
];

const validURLpattern = new RegExp(
  /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
);

const profileIndex = {
  personalInfo: 0,
  aboutMe: 1,
  availabilityInfo: 2,
  experience: 3,
  skillsDriverLicense: 4,
  resume: 5,
  diplomaCertifications: 6,
  references: 7,
  uploads: 8,
};

const markKey = {
  Little: 1,
  Some: 2,
  Considerable: 3,
  Extensive: 4,
  Hobby: 0,
  Amateur: 1,
  Professional: 2,
};

const experienceNumbers = {
  10: 5,
  11: 10,
  12: 15,
  20: 15,
  21: 20,
  22: 25,
  30: 30,
  31: 35,
  32: 40,
  40: 45,
  41: 50,
  42: 55,
};

const experienceColors = {
  45: "#C74C49",
  50: "#C74C49",
  55: "#c75c49",
  60: "#E07A17",
  65: "#E07A17",
  70: "#c7b649",
  75: "#c7b649",
  80: "#c2c749",
  85: "#c2c749",
  90: "#8ac749",
  95: "#65c749",
  100: "#60c749",
};

const skillProgress = {
  Novice: { color: "#c7b649", percentage: 70 },
  Experienced: { color: "#c2c749", percentage: 80 },
  "Very Good": { color: "#8ac749", percentage: 90 },
  Proficient: { color: "#60c749", percentage: 100 },
};

const toSentence = {
  dateOfBirth: "Date Of Birth",
  lookingForLiveInPosition: "Looking For Live In Position",
  gender: "Gender",
  nationality: "Nationality",
  ethnicity: "Ethnicity",
  alcoholConsumption: "Alcohol Consumption",
  drugTest: "Drug Test",
  smoker: "Smoker",
  visibleTattoos: "Visible Tattoos",
  criminalRecord: "Criminal Record",
  clarification: "Clarification",
  maritalStatus: "Marital Status",
  lookingForWorkAsCouple: "Looking For Work As Couple",
  availability: "Availability",
  currentCountry: "Current Country",
  currentLocation: "Current Location",
  clipping: "Clipping",
  longing: "Longing",
  longReining: "Long Reining",
  handlingStallion: "Handling Stallion",
  handlingYoungHorses: "Handling Young Horses",
  exerciseRiding: "Exercise Riding",
  hacking: "Hacking",
  breakingIn: "Breaking In",
  FEIExperience: "FEI Experience",
  teaching: "Teaching",
  braiding: "Braiding",
  bandaging: "Bandaging",
  carriageDriving: "Carriage Driving",
  jumpSchool: "Jump School",
  courseBuilding: "Course Building",
  eventManagement: "Event Management",
  equineFirstAid: "Equine First Aid",
  travelWithHorses: "Travel With Horses",
  logisticsPlanning: "Logistics Planning",
  transportingHorses: "Transporting Horses",
  entries: "Entries",
  equinePaperwork: "Equine Paperwork",
  championship: "Championship",
  sales: "Sales",
  computerSkills: "Computer Skills",
  marketing: "Marketing",
  socialMedia: "Social Media",
};

const experienceDurationsMinMax = {
  "0 - 6 months": {
    min: 0,
    max: 6,
  },
  "6 months - 1 year": {
    min: 6,
    max: 12,
  },
  "1 - 2 years": {
    min: 12,
    max: 24,
  },
  "2 - 5 years": {
    min: 24,
    max: 60,
  },
  "5+ years": {
    min: 60,
    max: 120,
  },
  "10+ years": {
    min: 120,
    max: 1200,
  },
};

const handlers = {
  personalInfo: async ({ type, body, userId, prevCandidate }) => {
    const filter = { _id: userId };
    await User.findOneAndUpdate(filter, {
      forename: body[type].contactDetail.firstName,
      surname: body[type].contactDetail.lastName,
    });
    if (
      body[type]?.teamStatus?.lookingForWorkAsCouple === "Yes" &&
      body[type]?.teamStatus?.partnerEmail
    ) {
      const partnerEmail = body[type]?.teamStatus?.partnerEmail.toLowerCase();
      const candidateEmail = body[type]?.contactDetail?.email.toLowerCase();
      if (partnerEmail === candidateEmail) {
        throw new Error("Partners email can't be same as candidates");
      }
      //if c already has p
      const candidateTeamStatus = prevCandidate?.personalInfo?.teamStatus;
      if (candidateTeamStatus !== undefined) {
        const prevPartnerEmail = candidateTeamStatus?.partnerEmail;
        if (prevPartnerEmail !== undefined && prevPartnerEmail !== partnerEmail) {
          throw new Error("You already have a partner!");
        }
      }
      //if p already has p
      let selectedPartnerEmail = await Candidates.findOne(
        {
          "personalInfo.contactDetail.email": partnerEmail,
        },
        "personalInfo.teamStatus -_id"
      );
      if (selectedPartnerEmail === null) {
        throw new Error("Partners email isn't registered as a candidate");
      }

      const selectedPartnersPartner = selectedPartnerEmail?.personalInfo?.teamStatus?.partnerEmail;

      if (selectedPartnersPartner !== undefined && selectedPartnersPartner !== candidateEmail) {
        throw new Error("The selected partner already has a partner");
      }

      await Candidates.findOneAndUpdate(
        { "personalInfo.contactDetail.email": partnerEmail },
        {
          "personalInfo.teamStatus.lookingForWorkAsCouple": "Yes",
          "personalInfo.teamStatus.partnerEmail": candidateEmail,
        }
      );

      body[type].teamStatus.partnerEmail = partnerEmail;
    }

    await JobAlerts.findOneAndUpdate(
      { userId },
      {
        ...body[type]?.desiredPosition?.jobAlerts,
      }
    );

    return body;
  },
  aboutMe: async ({ type, body, userId }) => {
    if (body[type]?.aboutMeAnother?.text && body[type]?.aboutMeAnother?.language === undefined) {
      throw new Error("About Me Another Language is required");
    }
    if (
      body[type]?.hobbiesInterestsAnother?.text &&
      body[type]?.hobbiesInterestsAnother?.language === undefined
    ) {
      throw new Error("Hobbies Interests Another Language is required");
    }

    return body;
  },
  experience: async ({ type, body }) => {
    let totalMonths = 0;
    body[type].generalExperience = [
      body[type].professionalEquineExperience,
      ...body[type].generalExperience,
    ];
    const experiences = body[type].experiences;
    experiences.forEach(({ startDate, endDate, stillEmployed }) => {
      totalMonths += +moment(stillEmployed ? new Date() : new Date(endDate)).diff(
        moment(new Date(startDate)),
        "months"
      );
    });
    body[type].totalExperienceDurationMonths = totalMonths;
    return body;
  },
  resume: async ({ type, body, userId }) => {
    const file = body[type];
    // add, update resume
    if (file) {
      const checkedFile = checkValidFileTypes({
        base64: file,
        validFileTypes: ["pdf"],
      });
      if (file && !checkedFile.valid) {
        throw new Error("Invalid File Types!");
      }
      body[type] = Object.values(
        await uploadPDFToS3({
          key: `${userId}-resume`,
          pdfBase64: file,
          ContentType: checkedFile.type,
        })
      ).join("");
    } else {
      // delete file
      s3Bucket.deleteObject({ Key: `${userId}-resume` }, (err) => {
        if (err) throw new Error(err);
      });
    }
    return body;
  },
  diplomaCertifications: async ({ type, body }) => {
    // delete prev removed or updated certificates
    const filesToDelete = body[type].filesToDelete;
    if (filesToDelete?.length) {
      filesToDelete.forEach((oldFileUrl) => {
        const Key = oldFileUrl.split("com/")[1];
        s3Bucket.deleteObject({ Key }, (err) => {
          if (err) throw new Error(err);
        });
      });
    }

    // upload new certificates
    const uploads = body[type].certifications.map((x) => {
      const { title, issuedBy, file, url } = x;
      if (file && url) {
        throw new Error("Invalid request, File and url can not co-exist.");
      }
      if (!file && !url) {
        throw new Error("Invalid request, File is required.");
      }

      const checkedFile = checkValidFileTypes({
        base64: file,
        validFileTypes: ["pdf"],
      });
      if (file && !checkedFile.valid) {
        throw new Error("Invalid File Type!");
      }

      return uploadPDFToS3({
        key: `${title}-${issuedBy}-certificate`,
        pdfBase64: file,
        ContentType: checkedFile.type,
      });
    });

    const uploadUrls = await Promise.all(uploads);

    body[type].certifications = body[type].certifications.map((x, index) => {
      const { file, url } = x;
      return {
        ...x,
        url: file ? uploadUrls[index] : url ? url : "",
      };
    });
    return body;
  },
  references: async ({ type, body, userId, req, prevCandidate }) => {
    const newEmails = [];
    const prevEmails = prevCandidate?.references?.map((x) => x.email);

    // deleting old files
    const filesToDelete = req.body.filesToDelete || [];
    filesToDelete.forEach((oldFileUrl) => {
      const Key = oldFileUrl.split("com/")[1];
      s3Bucket.deleteObject({ Key }, (err) => {
        if (err) throw new Error(err);
      });
    });

    // uploading new files
    const uploads = body[type].map((x) => {
      const { file, name, companyName, url } = x;
      let email = x.email;

      email = email.toLowerCase();

      !prevEmails?.includes(email) &&
        newEmails.push({
          email,
          name,
          companyName,
          candidateId: prevCandidate.userId,
        });
      if (prevCandidate.personalInfo.contactDetail.email === email) {
        throw new Error("Candidate and reference can't have same emails!");
      }

      if (url) {
        return url;
      } else if (file) {
        const { valid, type } = checkValidFileTypes({
          base64: file,
          validFileTypes: ["pdf", "jpg", "jpeg", "png"],
        });
        if (file && !valid) {
          throw new Error("Invalid File Type!");
        }

        return uploadPDFToS3({
          key: `${userId}-${
            name + "-" + companyName + "-" + Math.random().toString().split(".")[1]
          }-reference`,
          pdfBase64: file,
          ContentType: type,
        });
      }
    });

    // delete deleted references from Reference Collection
    prevEmails.forEach(async (email) => {
      !newEmails.includes(email) && (await Reference.deleteOne({ userId, email }));
    });

    const uploadUrls = await Promise.all(uploads);

    const candidateName = `${prevCandidate?.personalInfo?.contactDetail?.firstName} ${prevCandidate?.personalInfo?.contactDetail?.lastName}`;

    // Send Reference emails
    newEmails.forEach(async ({ name, email, companyName, candidateId }) => {
      await mailer({
        to: email,
        subject: `${candidateName} - Reference`,
        html: `
<!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <meta name="x-apple-disable-message-reformatting" />

    <title></title>
    <link
      href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700"
      rel="stylesheet"
    />
    <style>
      html,
      body {
        margin: 0 auto;
        padding: 0;
        height: 100vh;
        width: 100%;
        background: #ebe8e2;
        font-family: "Poppins", sans-serif;
      }

      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        text-decoration: none;
      }
      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }

      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }
      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      *[x-apple-data-detectors],
      .unstyle-auto-detected-links *,
      .aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }

      .im {
        color: inherit !important;
      }

      img.g-img + div {
        display: none !important;
      }
      .heading1 {
        font-size: 29px;
        font-weight: 400;
        color: #424b49;
      }
      .spanClass {
        font-weight: 600;
        font-size: 29px;

        color: #424b49;
      }
      .imgLogo {
        width: 310px;
      }
      .img1 {
        height: 40px;
        width: 40px;
        margin-right: 15px;
      }
      .footerP {
        font-size: 16px;
        color: #424b49;
        font-weight: 400;
      }
      .middleBg {
        background-color: #ffffff;
        border-radius: 7px;
        padding: 40px 20px;
        margin: 0px 30px;
      }
      .imgDiv {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .innerImg {
        width: 140px;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
      .centerTopText {
        color: #252525;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        margin-top: 20px;
      }
      .welcomeSpan {
        color: #b19e85;
        font-size: 18px;
        font-weight: 600;
      }
      .borderDiv {
        border-bottom: 1px solid #e6e6ea;
        max-width: 300px;
        margin: 20px auto;
      }
      .textClass {
        color: #252525;
        font-size: 18px;
        font-weight: 400;
        margin-top: 20px;
      }
      .textClassUnderLine {
        color: #252525;
        font-size: 18px;
        font-weight: 400;
        margin-top: 20px;
        text-decoration: underline;
      }
      .aTag {
        color: #252525;
        font-weight: 600;
      }
    </style>
  </head>
  <body width="100%" style="mso-line-height-rule: exactly; padding: 30px 20px">
    <div style="max-width: 800px; margin: 0 auto; width: 100%; background: #ebe8e2">
      <!-- BEGIN BODY -->
      <table
        align="center"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
        width="100%"
        height="100vh"
        style="margin: auto"
      >
        <tr>
          <td valign="top">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="text-align: center">
                  <a href="https://www.yehaww.com" style="display: inline-flex"
                    ><img
                      src="https://github.com/muhammadSprintx/assets/blob/main/logo.png?raw=true"
                      class="imgLogo"
                  /></a>
                  <h1 class="heading1">
                    Dear
                    <span class="spanClass"> ${name} </span>
                  </h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- center tr -->
        <tr>
          <td valign="middle" style="padding-top: 30px">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td>
                  <div class="middleBg">
                    <div class="imgDiv">
                      <img
                        src="https://github.com/muhammadSprintx/assets/blob/main/thumb.png?raw=true"
                        alt=""
                        class="innerImg"
                      />
                    </div>
                    <div class="borderDiv"></div>

                    <p class="textClass">
                      This email is sent to you as a request to confirm my previous employment at
                      ${companyName}, so I can add this to my profile on
                      <a href="https://www.yehaww.com/" class="aTag" target="_blank">Yehaww.com</a>
                    </p>

                    <p class="textClass">
                      Please confirm my reference by clicking the following link below.
                      <a
                        href="https://www.beta.yehaww.com/reference-confirmation/?email=${email}&userId=${candidateId}"
                        class="aTag"
                        >https://www.beta.yehaww.com/reference-confirmation/?email=${email}&userId=${candidateId}</a
                      >
                    </p>
                    <p class="textClass">Thank you in advance</p>
                    <p class="textClass">
                      Kindest regards
                      <span>${candidateName}</span>
                    </p>
                    <p class="textClass">(Please do not reply to this email)</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- end tr -->
        <tr>
          <td valign="top" style="padding-top: 30px">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="text-align: center">
                  <a href="https://www.facebook.com/profile.php?id=100083581836008" target="_blank">
                    <img
                      src="https://github.com/muhammadSprintx/assets/blob/main/fb-y.png?raw=true"
                      class="img1"
                    />
                  </a>
                  <a href="https://www.instagram.com/yehaww_com/" target="_blank">
                    <img
                      src="https://github.com/muhammadSprintx/assets/blob/main/insta-y.png?raw=true"
                      class="img1"
                    />
                  </a>
                  <a href="https://www.linkedin.com/company/yehaww/" target="_blank">
                    <img
                      src="https://github.com/muhammadSprintx/assets/blob/main/linked-in-y.png?raw=true"
                      class="img1"
                      style="margin-right: 0px"
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="text-align: center; padding: 30px 0px">
                    <p class="footerP">Yehaww LLC</p>
   <p class="footerP">
                    <a href="mailto:info@yehaww.com" target="_blank">
                      info@yehaww.com
                      </a> 
                      | 
                     <a href="https://www.yehaww.com/" target="_blank">
                        yehaww.com
                      </a>
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`,
      });
    });

    body[type] = body[type].map((x, index) => {
      return {
        ...x,
        url: x.file ? uploadUrls[index] : x.url ? x.url : "",
      };
    });
    return body;
  },
  uploads: async ({ type, body, userId, files, prevCandidate }) => {
    let newUploads = {};
    let keysToDelete = [];
    const random = Math.floor(Math.random() * 10000000000000);

    // delete prev removed or updated files
    const filesToDelete = body[type]?.filesToDelete || [];

    if (filesToDelete.length) {
      keysToDelete = filesToDelete.map((x) => {
        return x.split("-").pop();
      });
      filesToDelete.forEach((oldFileUrl) => {
        const Key = oldFileUrl.split("com/")[1];
        s3Bucket.deleteObject({ Key }, (err) => {
          if (err) throw new Error(err);
        });
      });
    }
    // delete old files ok new added files
    if (
      files &&
      Object.keys(files).length &&
      prevCandidate?.uploads &&
      Object.keys(prevCandidate?.uploads).length
    ) {
      const oldFileKeysToDelete = Object.keys(files);
      const prevUploadKeys = Object.keys(prevCandidate.uploads);

      oldFileKeysToDelete.forEach((x) => {
        if (prevUploadKeys.includes(x)) {
          const Key = prevCandidate.uploads[x].split("com/")[1];
          s3Bucket.deleteObject({ Key }, (err) => {
            if (err) throw new Error(err);
          });
        }
      });
    }

    // validate files
    if (files === null && !filesToDelete.length) {
      throw new Error("No File Attached!");
    }

    if (files !== undefined) {
      const { mainPhoto, video, partnerCV, additionalFiles } = files;

      // validate file types if exists
      if (mainPhoto === undefined && !prevCandidate[type]?.mainPhoto) {
        throw new Error("Main Photo is required");
      }
      if (mainPhoto !== undefined && !validImageTypes.includes(mainPhoto.mimetype)) {
        throw new Error("Invalid Main Photo Type");
      }
      if (video !== undefined && !["video/mp4"].includes(video.mimetype)) {
        throw new Error("Invalid Video Type");
      }
      if (partnerCV !== undefined && !["application/pdf"].includes(partnerCV.mimetype)) {
        throw new Error("Invalid Partner CV Type");
      }
      if (
        additionalFiles !== undefined &&
        !["application/pdf", ...validImageTypes].includes(additionalFiles.mimetype)
      ) {
        throw new Error("Invalid Additional File Type");
      }

      //   // create files upload promise array
      const uploads = [
        mainPhoto
          ? uploadBufS3Wrapper({
              key: `${random}${userId}-mainPhoto`,
              file: mainPhoto,
            })
          : "",
        video ? uploadBufS3Wrapper({ key: `${userId}-video`, file: video }) : "",
        partnerCV ? uploadBufS3Wrapper({ key: `${userId}-partnerCV`, file: partnerCV }) : "",
        additionalFiles
          ? uploadBufS3Wrapper({
              key: `${userId}-additionalFiles`,
              file: additionalFiles,
            })
          : "",
      ];

      // uploading files to s3
      const [mainPhotoLink, videoLink, partnerCVLink, additionalFilesLink] = await Promise.all(
        uploads
      );

      newUploads = {
        ...prevCandidate[type],
        ...(mainPhotoLink && { mainPhoto: mainPhotoLink }),
        ...(videoLink && { video: videoLink }),
        ...(partnerCVLink && { partnerCV: partnerCVLink }),
        ...(additionalFilesLink && { additionalFiles: additionalFilesLink }),
      };
    }
    uploadsTemp = {
      ...prevCandidate[type],
      ...newUploads,
    };
    keysToDelete.forEach((x) => {
      delete uploadsTemp[x];
    });
    body[type] = uploadsTemp;

    return body;
  },
};

const completeHandler = {
  experience: ({ body, type }) =>
    Object.values(body[type].generalExperience).length > 0 &&
    Object.values(body[type].experiences).length > 0
      ? true
      : false,
  uploads: ({ body, type }) => {
    let checkUploadComplete = false;
    Object.values(body[type]).forEach((x) => {
      checkUploadComplete = x.includes("mainPhoto") ? true : checkUploadComplete;
    });
    return checkUploadComplete;
  },
  resume: ({ body, type }) => (Object.values(body[type]).length ? true : false),
  diplomaCertifications: ({ body, type }) =>
    body[type]?.certifications.map((x) => x.url).length ? true : false,
  references: ({ body, type, prevCandidate }) => {
    return body[type]?.length ? true : false;
  },
  skillsDriverLicense: ({ body, type }) => {
    const uniqueSkillValues = Array.from(new Set(Object.values(body[type].skills)));

    return Object.values(body[type].licenses).includes("Yes") ||
      uniqueSkillValues.includes("Experienced") ||
      uniqueSkillValues.includes("Novice") ||
      uniqueSkillValues.includes("Very Good") ||
      uniqueSkillValues.includes("Proficient")
      ? true
      : false;
  },
};

const resultCardFormat = (candidates) => {
  const {
    _id,
    userId,
    personalInfo: {
      contactDetail: { firstName, lastName },
    },
    availabilityInfo: { availability, currentCountry },
    uploads: { mainPhoto },
  } = candidates;

  return {
    id: _id,
    mainPhoto: mainPhoto ? mainPhoto : "",
    name: firstName + " " + lastName,
    match: 100,
    availability,
    currentCountry,
  };
};

const handleDataMapping = async (newCandidate, subscribed) => {
  let {
    userId,
    uploads,
    aboutMe,
    experience,
    availabilityInfo,
    skillsDriverLicense,
    personalInfo: {
      contactDetail,
      personalInformation,
      teamStatus,
      languages,
      passportVisaInformation,
    },
    profileCompletion,
    diplomaCertifications,
    references,
    coverLetter,
    createdAt,
    jobDetails,
  } = newCandidate;

  createdAt = moment(moment(createdAt)).format("Do MMM YYYY");

  if (personalInformation) {
    personalInformation = Object.keys(personalInformation).map((key) => {
      if (key === "dateOfBirth") {
        personalInformation[key] = moment(Date(personalInformation[key])).format("Do MMM YYYY");
      }
      return { key, label: toSentence[key], value: personalInformation[key] };
    });
  }
  if (teamStatus) {
    if (teamStatus?.partnerEmail) {
      const partnerData = await Candidates.findOne(
        {
          "personalInfo.contactDetail.email": teamStatus?.partnerEmail,
        },
        "personalInfo.contactDetail personalInfo.desiredPosition uploads"
      );
      const desiredPositions = [
        partnerData?.personalInfo?.desiredPosition?.firstChoice || "",
        partnerData?.personalInfo?.desiredPosition?.secondChoice || "",
      ];
      teamStatus.partnerEmail = {
        _id: partnerData._id || "",
        img: partnerData?.uploads?.mainPhoto || "",
        firstName: partnerData?.personalInfo?.contactDetail?.firstName || "",
        lastName: partnerData?.personalInfo?.contactDetail?.lastName || "",
        firstChoice: desiredPositions[0] || "",
        secondChoice: desiredPositions[1] || "",
      };
    }

    teamStatus = Object.keys(teamStatus).map((key) => {
      return { key, label: toSentence[key], value: teamStatus[key] };
    });
  }
  if (availabilityInfo) {
    availabilityInfo = Object.keys(availabilityInfo).map((key) => {
      return { key, label: toSentence[key], value: availabilityInfo[key] };
    });
  }
  if (skillsDriverLicense) {
    skillsDriverLicense = Object.keys(skillsDriverLicense.skills)
      .map((x) => {
        return {
          key: x,
          label: toSentence[x],
          value: skillsDriverLicense.skills[x],
          ...skillProgress[skillsDriverLicense?.skills[x]],
        };
      })
      ?.filter((x) => x.value !== "None");
  }

  experience.experienceLevel = experience?.experienceLevel
    ?.filter((x) => x.experienceLevel !== "None")
    .map(({ name, experienceLevel, experienceType }) => {
      const marksKey = `${markKey[experienceLevel]}${markKey[experienceType]}`;
      const percentage = experienceNumbers[marksKey] + 45;
      return {
        name,
        experienceType,
        experienceLevel,
        percentage,
        color: experienceColors[percentage],
      };
    });

  experience.experiences = experience.experiences.map((x) => {
    const { startDate, endDate } = x;
    const formatDate = (date) => moment(new Date(date)).format("Do MMMM YYYY");
    const a = moment(new Date(endDate));
    const b = moment(new Date(startDate));
    const years = a.diff(b, "year");
    b.add(years, "years");
    const months = a.diff(b, "months");
    b.add(months, "months");
    const days = a.diff(b, "days");

    // creates duration is this format (8 years 5 months 2 days)
    const duration = `(${years ? `${years} year${years > 1 ? "s" : ""}` : ""}${
      months ? `${months} month${months > 1 ? "s" : ""}` : ""
    }${years ? "" : days ? " " : ""}${
      years ? "" : days ? `${days} day${days > 1 ? "s" : ""}` : ""
    })`;

    return {
      ...x,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      duration,
    };
  });

  const data = {
    userId,
    aboutMe,
    uploads,
    languages,
    createdAt,
    references,
    teamStatus,
    experience,
    coverLetter,
    contactDetail,
    availabilityInfo,
    profileCompletion,
    personalInformation,
    skillsDriverLicense,
    diplomaCertifications,
    passportVisaInformation,
    shortlisted: jobDetails?.shortlisted,
  };

  if (!subscribed) {
    delete data?.references;
    delete data?.uploads?.video;
    delete data?.uploads?.partnerCV;
    delete data?.passportVisaInformation;
    delete data?.uploads?.additionalFiles;
    delete data?.contactDetail?.phoneNumber;
    delete data?.diplomaCertifications?.certifications;
  }
  return data;
};

module.exports = {
  handlers,
  profileIndex,
  completeHandler,
  validImageTypes,
  resultCardFormat,
  handleDataMapping,
  uploadBufS3Wrapper,
  experienceDurationsMinMax,
};
