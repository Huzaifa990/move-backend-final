const fs = require("fs");
const moment = require("moment");
const mongoose = require("mongoose").Types.ObjectId;
const Job = require("../../models/jobs");
const User = require("../../models/users");
const jobAlerts = require("../../models/jobAlerts");
const Candidate = require("../../models/candidates");
const InterestedJob = require("../../models/interestedJobs");

const { handleJobMapping } = require("../dashboard/helper");
const { uploadBufS3Wrapper, mailer } = require("../../utils/helper");
const {
  uploadFile,
  deleteImage,
  salaryOptions,
  validateCity,
  handleSingleJobMapping,
  activePostsFrontEndFormat,
} = require("./helper");
const { stayCleanPositions, genderOptions, newPositionArr } = require("../../utils/arrayHelper");

const getJobById = async (req, res) => {
  let interestedJobIds = [];
  const jobId = req.params.id;
  const { _id, type } = req.body;

  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(409).send({ msg: "Job not found" });
  }

  if (type === "candidate") {
    interestedJobIds = await InterestedJob.find(
      { userId: _id, applicationRemoved: false },
      "-_id jobId"
    );
    interestedJobIds = interestedJobIds.map((x) => x?.jobId?.toString());
  }

  res.status(200).send(handleSingleJobMapping(job.toObject(), interestedJobIds));
};

const getAllJobs = async (req, res) => {
  let interestedJobIds = [];
  const {
    page,
    visa,
    team,
    gender,
    sortBy,
    salary,
    liveIn,
    jobType,
    mapView,
    jobTitle,
    category,
    pageSize,
    currency,
    properties,
    companyName,
    companyType,
    nationality,
    companySize,
    availability,
    employmentType,
    homeBaseCountry,
    levelOfOperation,
    professionalExperience,
    currentlyLocatedCountry,
    candidateCurrentlyBased,
  } = req.query;

  const { _id, type } = req.body;

  const query = {
    ...(jobTitle && { jobTitle }),
    ...(jobType && { jobType }),
    ...(category && {
      jobTitle: Object.keys(newPositionArr).includes(category)
        ? { $in: newPositionArr[category] }
        : "",
    }),
    ...(employmentType && { employmentType }),
    ...(companyType && { "companyInfo.companyType": companyType }),
    ...(companyName && { "companyInfo.companyName": companyName }),
    ...(companySize && { "companyInfo.companySize": companySize }),
    ...(levelOfOperation && { "companyInfo.levelOfOperation": levelOfOperation }),
    ...(homeBaseCountry && { "positionInfo.homeBase.country": homeBaseCountry }),
    ...(currentlyLocatedCountry && {
      "positionInfo.currentlyLocated.country": currentlyLocatedCountry,
    }),
    ...(liveIn && { "positionInfo.liveIn": liveIn }),
    ...(currency && { "positionInfo.currency": currency }),
    ...(salary && {
      "positionInfo.salary": {
        $gte: salaryOptions[salary].min,
        ...(salaryOptions[salary].max && { $lte: salaryOptions[salary].max }),
      },
    }),
    ...(gender && { "preferredCandidate.gender": gender }),
    ...(visa && { "preferredCandidate.visa.visaType": visa }),
    ...(availability && { "preferredCandidate.availability": availability }),
    ...(professionalExperience && {
      "preferredCandidate.professionalExperience": professionalExperience,
    }),
    ...(team && { "preferredCandidate.team": team }),
    ...(nationality && {
      $or: nationality.map((x) => {
        return {
          "preferredCandidate.nationality": x,
        };
      }),
    }),
    ...(candidateCurrentlyBased && {
      $or: candidateCurrentlyBased.map((x) => {
        return {
          "preferredCandidate.candidateCurrentlyBased": x,
        };
      }),
    }),
  };

  if (type === "candidate") {
    interestedJobIds = await InterestedJob.find(
      { userId: _id, applicationRemoved: false },
      "-_id jobId"
    );
    interestedJobIds = interestedJobIds.map((x) => x.jobId?.valueOf());
  }

  const jobs = handleJobMapping(
    await Job.find(query, properties)
      .sort({
        ...(sortBy === "latest" && { createdAt: -1 }),
        ...(sortBy === "startDate" && { "positionInfo.startDate": 1 }),
        ...(sortBy === "salary" && { "positionInfo.salary": -1 }),
      })
      .skip(pageSize * page)
      .limit(pageSize),
    interestedJobIds,
    mapView
  );
  const jobsCount = await Job.find(query).count();

  if (jobsCount === 0) return res.status(200).send({ jobs: [], jobsCount: 0 });
  return res.status(200).send({ jobs, jobsCount });
};

const postJob = async (req, res) => {
  const userId = req.body._id;
  const { job } = req.body;
  const {
    job: {
      positionInfo: { image, homeBase, currentlyLocated },
    },
  } = req.body;

  // validate home base city
  validateCity(homeBase?.country, homeBase?.city);

  // validate Currently Located city
  validateCity(currentlyLocated?.country, currentlyLocated?.city);

  stayCleanPositions.includes(job.jobTitle)
    ? (job.jobType = "Stay Clean")
    : (job.jobType = "Hands On");

  const user = await User.findById(userId);
  if (!user) {
    return res.status(409).send({ msg: "User does not exists" });
  }
  if (user.type != "employer") {
    return res.status(409).send({ msg: "User is not an employer" });
  }

  job.jobId = Math.floor(Math.random() * 10000000000000);
  job.jobFilledStatus = false;

  if (!job.positionInfo.image.startsWith("https://yehaww-bucket")) {
    job.positionInfo.image = await uploadFile({ image, jobId: job.jobId, userId });
  }

  const updatedJob = new Job({
    userId,
    ...job,
  });
  await updatedJob.save();

  const filter = {
    positions: job.jobTitle,
    locations: { $in: job.preferredCandidate.candidateCurrentlyBased },
  };
  const candidateAlert = await jobAlerts.find(filter, "-_id userId");
  const emails = candidateAlert.map((x) => x.userId);
  const candidateContactDetail = await Candidate.find(
    { emailAlerts: true, userId: { $in: emails } },
    "-_id personalInfo.contactDetail"
  );
  const candidateFirstName = candidateContactDetail.map(
    (x) => x.personalInfo.contactDetail.firstName
  );
  const candidateLastName = candidateContactDetail.map(
    (x) => x.personalInfo.contactDetail.lastName
  );

  const jobAlertEmails = candidateContactDetail.map((x) => x.personalInfo.contactDetail.email);

  jobAlertEmails.length &&
    (await mailer({
      to: jobAlertEmails,
      subject: `Job Alert`,
      html: `<!DOCTYPE html>
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
                margin:0px 30px;

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
            <table
              role="presentation"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tr>
                <td style="text-align: center">
                  <a
                    href="https://www.yehaww.com"
                    style="display: inline-flex"
                    ><img src="https://github.com/muhammadSprintx/assets/blob/main/logo.png?raw=true" class="imgLogo"
                  /></a>
                  <h1 class="heading1">
                    Dear
                    <span class="spanClass">
                      ${candidateFirstName} ${candidateLastName},
                    </span>
                  </h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- center tr -->
        <tr>
          <td valign="middle" style="padding-top: 30px">
            <table
              role="presentation"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tr>
                <td>
                  <div class="middleBg">
                    <div class="imgDiv">
                      <img
                        src="https://github.com/muhammadSprintx/assets/blob/main/tv.png?raw=true"
                        alt=""
                        class="innerImg"
                      />
                    </div>
                    <p class="centerTopText">
                      Welcome to your account at
                      <a href="https://www.yehaww.com/" target="_blank">
                        <span class="welcomeSpan">Yehaww.com </span>
                      </a>
                    </p>
                    <div class="borderDiv"></div>

                    <p class="textClass">
                      This email alert is sent to you to inform you about a job
                      that matches your preferred job criteria.
                    </p>

                    <p class="textClass">
                      ${job.companyInfo.companyName} is offering a position of
                      ${job.jobTitle}, the job type is ${job.jobType}.
                    </p>
                    <p class="textClass">
                      They require a person for ${job.employmentType}, for a
                      company of ${job.companyInfo.companySize} people.
                    </p>
                    <p class="textClass">
                      The expected joining date is ${job.positionInfo.startDate}
                      with a starting salary of ${job.positionInfo.currency}
                      ${job.positionInfo.salary}.
                    </p>
                    <p class="textClass">
                      The employee expectations are:
                      <br />
                      ${job.positionInfo.employeeExpectations}
                    </p>
                      <p class="textClass">
                   <p class="textClass">
                  Please check it out it might potentially be your next job.
                    <a href="https://beta.yehaww.com/job-profile/$%7BupdatedJob._id%7D" target="_blank" class="aTag">
                      https://beta.yehaww.com/job-profile/$%7BupdatedJob._id%7D
                      </a>
                    </p>
                    
                    </p>
                    <p class="textClass">Best of luck in advance</p>
                    <p class="textClass">Kindest regards</p>

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
            <table
              role="presentation"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tr>
                <td style="text-align: center">
                  <a
                    href="https://www.facebook.com/profile.php?id=100083581836008"
                    target="_blank"
                  >
                    <img src="https://github.com/muhammadSprintx/assets/blob/main/fb-y.png?raw=true" class="img1" />
                  </a>
                  <a
                    href="https://www.instagram.com/yehaww_com/"
                    target="_blank"
                  >
                    <img src="https://github.com/muhammadSprintx/assets/blob/main/insta-y.png?raw=true" class="img1" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/yehaww/"
                    target="_blank"
                  >
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
    }));

  return res.status(200).send({ msg: "Job Posted Successfully" });
};

const deleteJob = async (req, res) => {
  const { _id, type } = req.body;
  const jobObjectId = req.params.id;

  if (type != "employer")
    return res.status(409).send({ msg: "Only employers are allowed to delete posts." });

  const job = await Job.findOne({ _id: jobObjectId, userId: _id });
  if (!job) return res.status(409).send({ msg: "Job not found or Invalid Job Id" });

  const deleteJobPosition = await Job.deleteOne({ _id: jobObjectId });
  if (!deleteJobPosition.deletedCount) {
    return res.status(500).send("Delete Job Failed");
  }
  deleteImage({ jobId: job.jobId, userId: _id });
  res.status(200).send({ msg: "Job Deleted Successfully" });
};

// redundant now
const addCoverLetter = async (req, res) => {
  const { _id, type, jobId, coverLetter } = req.body;

  if (type !== "candidate")
    return res.status(409).send({ msg: "Only candidate are allowed to add cover letter." });

  const job = await InterestedJob.findOne({ userId: _id, jobId });
  if (!job) return res.status(409).send({ msg: "Invalid Job Id" });

  const updatedInterestedJob = await InterestedJob.updateOne(
    { userId: _id, jobId },
    {
      coverLetter,
    }
  );
  if (!updatedInterestedJob.acknowledged)
    return res.status(409).send({ msg: "Failed to Update Cover Letter!" });

  res.status(200).send({ msg: "Cover Letter Added Successfully" });
};

const addCandidateNote = async (req, res) => {
  const { candidateId, type, jobId, candidateNote } = req.body;

  if (type !== "employer")
    return res.status(409).send({ msg: "Only Employers are allowed to Add Candidate Note!" });

  const interestedJob = await InterestedJob.findOne({ userId: candidateId, jobId });
  if (!interestedJob) return res.status(409).send({ msg: "Interested Job does not exist!" });

  const updatedInterestedJob = await InterestedJob.updateOne(
    { jobId },
    {
      candidateNote,
    }
  );
  if (!updatedInterestedJob.acknowledged)
    return res.status(409).send({ msg: "Failed to Update Candidate Note!" });

  res.status(200).send({ msg: "Candidate Note Added Successfully" });
};

const editJob = async (req, res) => {
  const userId = req.body._id;
  const jobId = req.params.id;
  const { job } = req.body;
  const {
    job: {
      positionInfo: { image },
    },
  } = req.body;

  if (req.body.type !== "employer") {
    return res.status(409).send({ msg: "User is not an employer" });
  }

  const jobFound = await Job.findOne({ _id: jobId, userId });
  if (!jobFound) return res.status(409).send({ msg: "Job not found or Invalid Job Id" });

  if (image != jobFound.positionInfo.image) {
    if (!image.startsWith("https://yehaww-bucket")) {
      job.positionInfo.image = await uploadFile({
        image,
        jobId: jobFound.jobId,
        userId,
      });
    }
  }
  const updatedJob = await Job.updateOne(
    { _id: jobId, userId },
    {
      ...job,
    }
  );
  if (!updatedJob.acknowledged) return res.status(409).send({ msg: "Job Update Failed" });

  return res.status(200).send({ msg: "Job Updated Successfully" });
};

const markAsFilled = async (req, res) => {
  const { _id, type } = req.body;
  const jobObjectId = req.params.id;

  if (type !== "employer")
    return res.status(409).send({ msg: "Only employers are allowed to delete posts." });

  const job = await Job.findOne({ _id: jobObjectId, userId: _id });
  if (!job) return res.status(409).send({ msg: "Job not found." });

  job.jobFilledStatus = !job.jobFilledStatus;
  const updatedStatus = await Job.findOneAndUpdate(
    { _id: jobObjectId },
    {
      ...job,
    },
    {
      upsert: true,
      new: true,
    }
  );
  await updatedStatus.save();

  return res.status(200).send({
    msg: updatedStatus.jobFilledStatus
      ? "Job Marked as filled Successfully"
      : "Job Marked as unfilled Successfully",
  });
};

const getAllJobsActivePosts = async (req, res) => {
  const { properties, pageSize, page } = req.query;
  let { sortBy } = req.query;
  const { _id, type } = req.body;

  if (type !== "employer")
    return res.status(409).send({ msg: "Only employers are allowed to view active posts." });

  if (sortBy === "createdAt") {
    sortBy = { createdAt: -1 };
  }

  let jobs = await Job.find({ userId: _id }, properties)
    .sort(sortBy)
    .skip(pageSize * page)
    .limit(pageSize);
  const jobsCount = await Job.find({ userId: _id }).count();
  if (jobsCount === 0) return res.status(409).send({ msg: "No Jobs Found." });

  jobs = jobs.map(activePostsFrontEndFormat);
  return res.status(200).send({ jobs, jobsCount });
};

const updateInterestedJobs = async (req, res) => {
  const { _id, type } = req.body;
  const { jobId, interested, coverLetter } = req.body;

  if (type !== "candidate")
    return res.status(409).send({ msg: "Only Candidates Are Allowed To Mark Jobs As Interested!" });

  const job = await Job.findById(jobId);
  if (!job) return res.status(409).send({ msg: "Invalid Job Id!" });

  const interestedJobExists = await InterestedJob.findOne({ jobId, userId: _id });

  const candidate = await Candidate.findOne({ userId: _id }).select("profileCompletion");
  if (candidate.profileCompletion !== 100) {
    return res.status(409).send({ msg: "Please Complete Your Profile First!" });
  }

  if (interested === false && interestedJobExists) {
    await InterestedJob.findOneAndUpdate({ jobId, userId: _id }, { applicationRemoved: true });
    return res.status(200).send({ msg: "Job Application Removed!" });
  }

  if (interested) {
    if (interested && interestedJobExists?.applicationRemoved) {
      await InterestedJob.findOneAndUpdate(
        { jobId, userId: _id },
        { coverLetter, applicationRemoved: false }
      );
      return res.status(200).send({ msg: "Job Added back to Interested Jobs" });
    }

    //condition checking if not already in interested jobs, add it.
    if (!interestedJobExists) {
      const dateNow = moment().toDate();
      const updatedInterestedJob = new InterestedJob({
        userId: _id,
        jobId: new mongoose(jobId),
        jobTitle: job.jobTitle,
        companyName: job.companyInfo.companyName,
        companyImage: job.positionInfo.image,
        coverLetter,
        applicationRemoved: false,
        dateApplied: dateNow,
        jobPostedByEmployerId: job.userId,
      });
      await updatedInterestedJob.save();
      return res.status(200).send({ msg: "Job Added to Interested Jobs" });
    } else {
      return res.status(409).send({ msg: "Added to Interested Jobs Already" });
    }
  }
};

const getCandidateMyJobs = async (req, res) => {
  const { _id, type } = req.body;
  if (type != "candidate")
    return res
      .status(409)
      .send({ msg: "Only Candidates can see the jobs he saved or jobs of his interests." });

  let myJobs = await InterestedJob.aggregate([
    {
      $match: {
        userId: _id,
        applicationRemoved: false,
      },
    },
    {
      $lookup: {
        from: "jobs",
        localField: "jobId",
        foreignField: "_id",
        pipeline: [
          {
            $match: {
              createdAt: {
                $gte: new Date(moment().subtract(21, "days")),
              },
            },
          },
        ],
        as: "jobDetails",
      },
    },
    { $unwind: "$jobDetails" },
    {
      $project: {
        _id: 1,
        userId: 1,
        jobId: 1,
        jobTitle: 1,
        dateApplied: 1,
        companyImage: 1,
        createdAt: "$jobDetails.createdAt",
      },
    },
  ]);
  if (myJobs.length === 0) res.status(200).send({ myJobs });

  const jobsCounts = await Job.aggregate([
    {
      $match: {
        _id: {
          $in: myJobs.map((x) => x.jobId),
        },
      },
    },
    {
      $lookup: {
        from: "interestedjobs",
        localField: "_id",
        foreignField: "jobId",
        as: "jobDetails",
      },
    },
    {
      $project: {
        appliedCandidates: { $size: "$jobDetails" },
      },
    },
  ]);

  myJobs = myJobs.map((x) => {
    return {
      ...x,
      expiresIn: moment(moment(x.createdAt).add(22, "days")).diff(moment(new Date()), "days"),
      appliedCandidates: jobsCounts.find((y) => y._id.valueOf() === x.jobId.valueOf())
        ?.appliedCandidates,
    };
  });

  res.status(200).send({ myJobs });
};

const shortListCandidates = async (req, res) => {
  const { _id, type, notes, userId, jobId, interestedStatus } = req.body;

  if (type != "employer")
    return res.status(409).send({ msg: "Only Employers Are Allowed To Shortlist Candidates" });

  const shortListCandidate = await InterestedJob.findOne({ userId, jobId });
  if (!shortListCandidate) res.status(409).send({ msg: "No such applied candidate found" });

  const jobPostedBy = await Job.findOne({ _id: jobId, userId: _id }); // finding employer who posted the job
  if (!jobPostedBy)
    return res
      .status(409)
      .send({ msg: "You are not allowed to shortlist candidate for the job you have not posted." });

  if (interestedStatus === "true") {
    shortListCandidates.shortlisted = true;
    shortListCandidates.notInterested = false;
  } else if (interestedStatus === "false") {
    shortListCandidates.shortlisted = false;
    shortListCandidates.notInterested = true;
  } else if (interestedStatus === "none") {
    shortListCandidates.shortlisted = false;
    shortListCandidates.notInterested = false;
  }

  if (notes) shortListCandidates.notes = notes;

  await InterestedJob.updateOne(
    { userId, jobId },
    {
      ...shortListCandidates,
    }
  );

  const updatedShortListCandidate = await InterestedJob.findOne({ userId, jobId });
  return res.status(200).send({
    msg: notes
      ? "Candidate Note Added"
      : updatedShortListCandidate.shortlisted
      ? "Candidate Shortlisted"
      : updatedShortListCandidate.notInterested
      ? "Candidate Not Interested"
      : "",
  });
};

const jobInterviews = async (req, res) => {
  const { _id, type, interviewQuestions, userId, jobId, videoInterviewRequest } = req.body;

  if (type != "employer")
    return res.status(409).send({ msg: "Only Employers Are Allowed To Add Interview Questions" });

  const jobPostedBy = await InterestedJob.findOne({ jobId, jobPostedByEmployerId: _id });
  if (!jobPostedBy)
    return res.status(409).send({
      msg: "You are not allowed to add interview questions for a job you have not posted.",
    });

  const appliedCandidate = await InterestedJob.findOne({ jobId, userId });
  if (!appliedCandidate)
    return res.status(409).send({
      msg: `No such applied job found for the following user id: ${userId}.`,
    });

  const updatedInterestedJob = await InterestedJob.updateOne(
    { userId, jobId },
    {
      videoInterviewRequest,
      interviewQuestions,
      interviewRequestDate: new Date(),
    }
  );
  if (!updatedInterestedJob?.acknowledged) {
    return res.status(409).send({
      msg: "Failed to Add Interview Questions!",
    });
  }

  return res.status(200).send({ msg: "Interview Questions Added Successfully!" });
};

const candidateJobInterviews = async (req, res) => {
  const { _id, type, jobId } = req.body;
  let { video } = req.files;
  if (type != "candidate")
    return res.status(409).send({ msg: "Only candidates are allowed to view this page" });

  const interestedJob = await InterestedJob.findOne({ jobId, userId: _id });
  if (!interestedJob)
    return res.status(409).send({
      msg: "Job not found",
    });

  if (video !== undefined && !["video/mp4"].includes(video.mimetype)) {
    throw new Error("Invalid Video Type, (mp4) Supported!");
  }

  const interviewVideoUrl = video
    ? await uploadBufS3Wrapper({
        key: `${_id + Math.floor(Math.random() * 10000000000000)}-video`,
        file: video,
      })
    : "";

  const updatedInterestedJob = await InterestedJob.updateOne(
    { userId: _id, jobId },
    { interviewVideoUrl }
  );
  if (!updatedInterestedJob.acknowledged) {
    return res.status(409).send({
      msg: "Unable to add video interview!",
    });
  }

  return res.status(200).send({ msg: "Interview Video Uploaded Successfully!" });
};

const allAppliedCandidates = async (req, res) => {
  const { _id, type } = req.body;
  const {
    jobId,
    page,
    visas,
    video,
    gender,
    skills,
    pageSize,
    verified,
    languages,
    teamCouple,
    availability,
    candidateType,
    nationalities,
    allShortListed,
    qualifications,
    quailifications,
    experienceLevelName,
  } = req.query;

  if (type != "employer")
    return res.status(409).send({ msg: "Only employer are allowed to view this page" });

  const candidatesFound = await InterestedJob.find({ jobPostedByEmployerId: _id });
  if (!candidatesFound)
    return res.status(409).send({
      msg: "No applied candidates found",
    });

  let matchQuery = null;
  if (candidateType === "shortlisted") {
    matchQuery = {
      shortlisted: {
        $exists: true,
      },
      shortlisted: true,
    };
  } else if (candidateType === "notInterested") {
    matchQuery = {
      notInterested: {
        $exists: true,
      },
      notInterested: true,
    };
  } else {
    matchQuery = {};
  }

  const query = {
    profileCompletion: 100,
    ...(availability && { "availabilityInfo.availability": availability }),
    ...(gender && {
      "personalInfo.personalInformation.gender": gender === "All" ? { $in: genderOptions } : gender,
    }),
    ...(video && { "uploads.video": { $regex: /video/i } }),
    ...(verified && { verifications: { $gte: 1 } }),
    ...(teamCouple !== undefined && {
      "personalInfo.teamStatus.lookingForWorkAsCouple": teamCouple ? "Yes" : "No",
    }),
    ...(experienceLevelName && {
      "experience.experienceLevel.name": { $in: experienceLevelName },
    }),
    ...(visas && {
      $or: visas.map((x) => {
        return {
          "personalInfo.passportVisaInformation.visa": x,
        };
      }),
    }),
    ...(nationalities?.length && {
      $or: nationalities.map((x) => {
        return {
          "personalInfo.personalInformation.nationality": x,
        };
      }),
    }),
    ...(qualifications && {
      "diplomaCertifications.educations": { $in: qualifications },
    }),
    ...(languages && {
      "personalInfo.languages.name": { $in: languages },
    }),
    ...(skills?.length && {
      $or: skills.map((x) => {
        return {
          [`skillsDriverLicense.skills.${x}`]: "Yes",
        };
      }),
    }),
  };

  const candidates = await InterestedJob.aggregate([
    {
      $match: {
        $and: [
          { jobPostedByEmployerId: _id },
          jobId && { jobId: mongoose(jobId) },
          { applicationRemoved: false },
          matchQuery,
        ].filter((x) => x !== undefined),
      },
    },
    {
      $lookup: {
        from: "jobs",
        localField: "jobId",
        foreignField: "_id",
        as: "jobDetails",
      },
    },
    { $unwind: "$jobDetails" },
    {
      $lookup: {
        from: "candidates",
        localField: "userId",
        foreignField: "userId",
        pipeline: [
          {
            $match: query,
          },
        ],
        as: "candidateDetails",
      },
    },
    { $unwind: "$candidateDetails" },
    { $skip: +pageSize * +page },
    { $limit: +pageSize },
    {
      $project: {
        userId: 1,
        notes: 1,
        coverLetter: 1,
        shortlisted: 1,
        notInterested: 1,
        interviewVideoUrl: 1,
        videoInterviewRequest: 1,
        jobId: "$jobDetails._id",
        jobTitle: "$jobDetails.jobTitle",
        cvLink: "$candidateDetails.resume",
        candidateId: "$candidateDetails._id",
        references: "$candidateDetails.references",
        mainPhoto: "$candidateDetails.uploads.mainPhoto",
        certificates: "$candidateDetails.diplomaCertifications",
        location: "$candidateDetails.availabilityInfo.currentCountry",
        availability: "$candidateDetails.availabilityInfo.availability",
        lastName: "$candidateDetails.personalInfo.contactDetail.lastName",
        firstName: "$candidateDetails.personalInfo.contactDetail.firstName",
        phoneNumber: "$candidateDetails.personalInfo.contactDetail.phoneNumber",
      },
    },
  ]);

  const candidates2 = await InterestedJob.aggregate([
    {
      $match: {
        $and: [
          { jobPostedByEmployerId: _id },
          { ...(jobId && { jobId: mongoose(jobId) }) },
          { applicationRemoved: false },
          matchQuery,
        ],
      },
    },
    {
      $lookup: {
        from: "jobs",
        localField: "jobId",
        foreignField: "_id",
        as: "jobDetails",
      },
    },
    { $unwind: "$jobDetails" },
    {
      $lookup: {
        from: "candidates",
        localField: "userId",
        foreignField: "userId",
        pipeline: [
          {
            $match: query,
          },
        ],
        as: "candidateDetails",
      },
    },
    { $unwind: "$candidateDetails" },
    { $skip: +pageSize * +page },
    { $limit: +pageSize },
    { $group: { _id: null, myCount: { $sum: 1 } } },
    {
      $project: {
        userId: 1,
        coverLetter: 1,
        interviewVideoUrl: 1,
        videoInterviewRequest: 1,
        jobId: "$jobDetails._id",
        jobTitle: "$jobDetails.jobTitle",
        candidateId: "$candidateDetails._id",
        mainPhoto: "$candidateDetails.uploads.mainPhoto",
        firstName: "$candidateDetails.personalInfo.contactDetail.firstName",
        lastName: "$candidateDetails.personalInfo.contactDetail.lastName",
        availability: "$candidateDetails.availabilityInfo.availability",
        location: "$candidateDetails.availabilityInfo.currentCountry",
        _id: 0,
        myCount: 1,
      },
    },
  ]);

  let count = 0;
  count = candidates2[0]?.myCount;
  return res.status(200).send({ candidates, count });
};

const interviewVideos = async (req, res) => {
  const { _id, type } = req.body;
  const { jobId, userId } = req.query;
  let jobs = [];
  let jobsCounts = [];
  let interestedJob = {};

  if (!jobId && !userId && type != "candidate") {
    return res
      .status(409)
      .send({ msg: "Only candidates are allowed to see My Interview Videos Page" });
  }

  if (jobId && userId) {
    interestedJob = await InterestedJob.aggregate([
      {
        $match: {
          jobId: new mongoose(jobId),
          userId,
          applicationRemoved: false,
        },
      },
      {
        $lookup: {
          from: "candidates",
          localField: "userId",
          foreignField: "userId",
          as: "userData",
        },
      },
    ]);
    interestedJob = interestedJob[0];
  }

  jobs = await InterestedJob.aggregate([
    {
      $match: {
        userId: _id,
        applicationRemoved: false,
        videoInterviewRequest: true,
      },
    },
    {
      $lookup: {
        from: "jobs",
        localField: "jobId",
        foreignField: "_id",
        pipeline: [
          {
            $match: {
              createdAt: {
                $gte: new Date(moment().subtract(21, "days")),
              },
            },
          },
        ],
        as: "jobDetails",
      },
    },
    { $unwind: "$jobDetails" },
    {
      $project: {
        _id: 1,
        jobId: 1,
        userId: 1,
        jobTitle: 1,
        coverLetter: 1,
        dateApplied: 1,
        companyImage: 1,
        interviewVideoUrl: 1,
        interviewRequestDate: 1,
        createdAt: "$jobDetails.createdAt",
      },
    },
  ]);

  jobsCounts = await Job.aggregate([
    {
      $match: {
        _id: {
          $in: jobs.map((x) => x.jobId),
        },
      },
    },
    {
      $lookup: {
        from: "interestedjobs",
        localField: "_id",
        foreignField: "jobId",
        as: "jobDetails",
      },
    },
    {
      $project: {
        appliedCandidates: { $size: "$jobDetails" },
      },
    },
  ]);

  jobs = jobs.map((x) => {
    return {
      ...x,
      expiresIn: moment(moment(x.createdAt).add(22, "days")).diff(moment(new Date()), "days"),
      appliedCandidates: jobsCounts.find((y) => y._id.valueOf() === x.jobId.valueOf())
        ?.appliedCandidates,
    };
  });

  return res.status(200).send({ jobs: jobId && userId ? interestedJob : jobs });
};

const deleteApplication = async (req, res) => {
  const { _id, type } = req.body;
  const { jobId } = req.query;

  if (type != "candidate") {
    return res.status(409).send({ msg: "Only candiates are allowed to remove applications" });
  }

  const jobs = await InterestedJob.find({ userId: _id, jobId });
  if (!jobs.length) {
    return res.status(409).send({ msg: "You didn't applied for this job" });
  }

  await InterestedJob.updateOne(
    { userId: _id, jobId },
    {
      applicationRemoved: true,
    }
  );

  return res.status(200).send({ msg: "Application removed successfully" });
  x;
};

const getInterviewData = async (req, res) => {
  const { _id, type } = req.body;
  const { jobId } = req.params;
  if (type != "candidate") {
    return res
      .status(409)
      .send({ msg: "Interview data is visible to particular candidate who applied to it only." });
  }
  let interviewData = await InterestedJob.findOne(
    { userId: _id, jobId, applicationRemoved: false },
    "jobId jobTitle interviewQuestions createdAt interviewVideoUrl"
  );
  if (!interviewData) {
    return res.status(409).send({ msg: "No interview data found against this Job Id" });
  }

  interviewData = interviewData.toObject();

  interviewData.expiresIn = moment(moment(interviewData.createdAt).add(22, "days")).diff(
    moment(new Date()),
    "days"
  );

  return res.status(200).send({ interviewData });
};

module.exports = {
  postJob,
  editJob,
  deleteJob,
  getJobById,
  getAllJobs,
  markAsFilled,
  jobInterviews,
  addCoverLetter,
  interviewVideos,
  getInterviewData,
  addCandidateNote,
  deleteApplication,
  getCandidateMyJobs,
  shortListCandidates,
  allAppliedCandidates,
  updateInterestedJobs,
  getAllJobsActivePosts,
  candidateJobInterviews,
};
