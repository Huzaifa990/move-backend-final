const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
require("dotenv").config();

const User = require("../../models/users");
const Employer = require("../../models/employers");
const JobAlerts = require("../../models/jobAlerts");
const Candidate = require("../../models/candidates");
const Subscription = require("../../models/Subscription");

const { forgotPassTemplate } = require("./helper");
const { mailer } = require("../../utils/helper");

const login = async (req, res) => {
  let candidate = {};
  let { email, password } = req.body;
  email = email.toLowerCase();

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ msg: "Email not found!" });
  }

  if (user.type === "candidate") {
    candidate = await Candidate.findOne({ userId: user._id });
    if (!candidate) {
      return res.status(404).send({ msg: "Candidate does not exists." });
    }
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(404).send({ msg: "Invalid Password Entered!" });
  }

  const token = user.generateAuthToken();

  user = user.toObject();
  user.candidateId = candidate._id;

  return res.header("authorization", token).status(200).json({ user });
};

const signUp = async (req, res) => {
  const {
    forename,
    surname,
    password,
    type,
    telCode,
    telephone,
    entity,
    companyName,
    businessAddress,
    newsLetter,
  } = req.body;
  let email = req.body.email;
  let phone = "";
  let newCandidate = {};
  let newEmployer = {};

  email = email.toLowerCase();

  const emailFound = await User.findOne({ email });
  if (emailFound) {
    return res.status(409).send({ msg: "Email already exists!" });
  }

  if (telCode && telephone) {
    phone = `${telCode} ${telephone}`;

    const phoneFound = await User.findOne({ phone });
    if (phoneFound) {
      return res.status(409).send({ msg: "Phone number already exists!" });
    }
  }

  const newUser = new User({
    forename,
    surname,
    email,
    password,
    type,
    ...(phone && { phone }),
    ...(entity && { entity }),
    ...(companyName && { companyName }),
    ...(businessAddress && { businessAddress }),
    newsLetter,
  });

  let user = await newUser.save();
  const token = user.generateAuthToken();

  if (type === "candidate") {
    newCandidate = new Candidate({
      userId: user._id,
      emailAlerts: newsLetter,
      profilePublicView: false,
      profileCompletion: 0,
      verifications: 0,
      profileStatuses: [false, false, false, false, false, false, false, false, false],
      personalInfo: {
        contactDetail: {
          firstName: forename,
          lastName: surname,
          email,
        },
      },
    });
    newCandidate = await newCandidate.save();
    user = user.toObject();
    user.candidateId = newCandidate._id;

    const name = `${forename} ${surname}`;
    await mailer({
      to: email,
      subject: `Yehaww - Welcome ${name}!`,
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
                    ><img
                      src="https://github.com/muhammadSprintx/assets/blob/main/logo.png?raw=true"
                      class="imgLogo"
                  /></a>
                  <h1 class="heading1">
                    Dear
                    <span class="spanClass">${name}, </span>
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
                        src="https://github.com/muhammadSprintx/assets/blob/main/monitor.png?raw=true"
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
                      As you are a talented person we want to connect you with
                      employers all over the world, giving you the opportunity
                      of a life time.
                    </p>
                    <p class="textClass">
                      This has always been the great idea behind Yehaww, no
                      matter where in the world you are, what position you are
                      looking for, Exercise Rider, dressage groom, property
                      manger, personal assistant, we will help you find that.
                    </p>
                    <p class="textClass">
                      After completing your profile online you can show interest
                      in any position you would like to apply for and just wait
                      for the employers to contact you.
                    </p>
                    <p class="textClass">
                      By doing so the employer(s) that posted the position(s)
                      you are interested in, will have access to your profile
                      and contact details.
                    </p>
                    <p class="textClass">
                      If you are the person they are looking for by meeting the
                      criteria for the job, such as experience, qualifications
                      and skills, you will automatically be shortlisted and
                      presented to the employer(s) by the website.
                    </p>
                    <p class="textClass">
                      On Yehaww we also have the feature to “Turn on” the
                      visibility of your profile at all times in your profile
                      settings, even if you are not showing interest in a
                      specific position at the moment. This will increase the
                      exposure of your profile and make it available when
                      searching in the database and will give you the
                      opportunity to be found directly by an employer.
                    </p>
                    <p class="textClass">
                      Yehaww is there for all of us in the Equestrian world to
                      build a strong community and we are so excited to have you
                      with us.
                    </p>
                    <p class="textClass">
                      Follow us on our
                      <a
                        href="https://www.instagram.com/yehaww_com/"
                        class="aTag"
                        target="_blank"
                        >Instagram</a
                      >
                      account for the latest news.
                    </p>

                    <p class="textClass">
                      If any questions do not hesitate to contact us at:
                      <a href="https://info@yehaww.com" class="aTag"
                        >info@yehaww.com</a
                      >
                    </p>
                    <p class="textClass">
                      We hope Yehaww will give you everything you wish for and
                      we are looking forward to hearing from you.
                    </p>
                    <p class="textClass">Best Regards</p>
                    <p class="textClass">
                      Yehaww Team
                      <a
                        href="https://www.yehaww.com/"
                        class="aTag"
                        target="_blank"
                        >www.yehaww.com</a
                      >
                    </p>
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
                    <img
                      src="https://github.com/muhammadSprintx/assets/blob/main/fb-y.png?raw=true"
                      class="img1"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/yehaww_com/"
                    target="_blank"
                  >
                    <img
                      src="https://github.com/muhammadSprintx/assets/blob/main/insta-y.png?raw=true"
                      class="img1"
                    />
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
    });

    const newJobAlerts = new JobAlerts({
      userId: user._id,
      locations: [],
      position: [],
      employmentTypes: [],
    });
    await newJobAlerts.save();
  }

  // Send Sign Up email
  if (type === "employer") {
    newEmployer = new Employer({
      userId: user._id,
      emailAlerts: newsLetter,
      personalDetails: {
        firstName: forename,
        lastName: surname,
        email,
        companyName,
        businessAddress,
        phoneNumber: telCode + telephone,
      },
    });
    newEmployer = await newEmployer.save();
    user = user.toObject();
    user.employerId = newEmployer._id;
    const name = `${forename} ${surname}`;
    await mailer({
      to: email,
      subject: `Yehaww - Welcome ${name}!`,
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
                    ><img
                      src="https://github.com/muhammadSprintx/assets/blob/main/logo.png?raw=true"
                      class="imgLogo"
                  /></a>
                  <h1 class="heading1">
                    Dear
                    <span class="spanClass"> ${name}, </span>
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
                      Welcome to your new account at
                      <a href="https://www.yehaww.com/" target="_blank">
                        <span class="welcomeSpan">Yehaww.com </span>
                      </a>
                    </p>
                    <div class="borderDiv"></div>
                    <p class="textClass">
                      As an employer, Yehaww can help you find and connect you
                      and your company with all the talented staff that the
                      equestrian world has to offer, all over the world.
                    </p>
                    <p class="textClass">
                      This has always been the great idea behind Yehaww, no
                      matter where in the world you, your farm or your company
                      is located. Or what position you are hoping to fill.
                      Looking for an exercise rider, dressage groom, property
                      manger or personal assistant? We will help you find what
                      you need. Post a job with the specific criteria you are
                      searching for in your new employee, such as experience,
                      qualifications and skills. Let the website shortlist a
                      group of candidates that are interested in your position
                      and that matches those criteria.
                    </p>
                    <p class="textClass">
                      You as an employer will then have access to the profiles
                      and contact details of all the shortlisted candidates.
                    </p>
                    <p class="textClass">
                      All you have to do then is to connect!
                    </p>
                    <p class="textClass">
                      You can also simply search in the Yehaww database to find
                      any talents that have the visibility of their profile
                      turned on. This means that the person isn’t interested in
                      a specific position at the moment but has chosen to
                      increase the exposure of their profile and want to be
                      available for contact directly by an employer. This is the
                      way to head hunt a person that might be the perfect choice
                      for you!
                    </p>
                    <p class="textClass">
                      Yehaww is there for all of us in the Equestrian world to
                      build a strong community and we are so excited to have you
                      with us.
                    </p>

                    <p class="textClass">
                      Follow us on our
                      <a
                        href="https://www.instagram.com/yehaww_com/"
                        class="aTag"
                        target="_blank"
                        >Instagram</a
                      >
                      account for the latest news.
                    </p>

                    <p class="textClass">
                      If any questions do not hesitate to contact us at:
                      <a href="https://info@yehaww.com" class="aTag"
                        >info@yehaww.com</a
                      >
                    </p>
                    <p class="textClass">
                      We hope Yehaww will give you everything you wish for and
                      we are looking forward to hearing from you.
                    </p>
                    <p class="textClass">Best Regards</p>
                    <p class="textClass">
                      Yehaww Team
                      <a
                        href="https://www.yehaww.com/"
                        class="aTag"
                        target="_blank"
                        >www.yehaww.com</a
                      >
                    </p>
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
                    <img
                      src="https://github.com/muhammadSprintx/assets/blob/main/fb-y.png?raw=true"
                      class="img1"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/yehaww_com/"
                    target="_blank"
                  >
                    <img
                      src="https://github.com/muhammadSprintx/assets/blob/main/insta-y.png?raw=true"
                      class="img1"
                    />
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
    });
  }

  return res.header("authorization", token).status(201).json({ user });
};

const forgotPassword = async (req, res) => {
  let { email } = req.body;

  email = email.toLowerCase();

  if (!email) {
    return res.status(422).send({ msg: "Email is missing" });
  }

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ msg: "Invalid email!" });
  }

  const randomNum = Math.round(Math.random() * 1000000);
  const userName = user.forename.charAt(0).toUpperCase() + user.forename.slice(1);
  const newPassword = `${userName.replace(" ", "")}@${randomNum}`;

  // let updateStatus = await User.updateOne({ email }, { $set: { password: newPassword } }); //pre function updates pass to encrypted pass
  // if (!updateStatus) {
  //   return res.status(500).send("Update Failed");
  // }

  const token = (() => {
    const maxAge = 3 * 24 * 60 * 60;
    const token = jwt.sign(
      {
        email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: maxAge,
      }
    );
    return token;
  })();

  // Send Reset Password email
  await mailer({
    to: email,
    subject: "Yehaww - Reset Password",
    html: forgotPassTemplate({ name: `${user?.forename} ${user?.surname}`, token, email }),
  });

  res.status(200).send({ msg: "Password reset email sent. Please Check your email." });
};

const changePassword = async (req, res) => {
  let { email, newPassword } = req.body;

  email = email.toLowerCase();

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ msg: "Invalid email!" });
  }

  let updateStatus = await User.updateOne({ email }, { $set: { password: newPassword } }); //pre function updates pass to encrypted pass
  if (!updateStatus) {
    return res.status(500).send("Update Failed");
  }

  res.status(200).send({ msg: "Password Updated Successfully." });
};

const resetPassword = async (req, res) => {
  let { token, password } = req.body;

  const decoded = await jwt.verify(token, process.env.JWT_KEY);

  if (!decoded?.email) {
    return res.status(400).send({ msg: "Invalid Rest Password Link Provided" });
  }

  const email = decoded?.email?.toLowerCase();

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ msg: "Invalid email!" });
  }

  let updateStatus = await User.updateOne({ email }, { $set: { password } }); //pre function updates pass to encrypted pass
  if (!updateStatus) {
    return res.status(500).send("Update Failed");
  }

  res.status(200).send({ msg: "Password Updated Successfully." });
};

const deleteProfile = async (req, res) => {
  const { _id, type, password } = req.body;
  let user = await User.findById(_id);
  if (!user) {
    return res.status(404).send({ msg: "Invalid User!" });
  }

  if (!ObjectId.isValid(_id)) {
    return res.status(404).send({ msg: "Invalid User Id!" });
  }

  if (password) {
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(404).send({ msg: "Invalid Password Entered!" });
    }
  }

  if (type === "employer") {
    await Employer.deleteOne({ userId: _id });
  }
  if (type == "candidate") {
    await Candidate.deleteOne({ userId: _id });
  }

  await User.deleteOne({ _id });

  const userDelCheck = await User.findOne({ _id });
  if (userDelCheck) {
    return res.status(404).send({ msg: "User wasn't deleted successfully" });
  }

  res.status(200).send({ msg: "Profile Deleted Successfully" });
};

const getById = async (req, res) => {
  let user = null;
  let candidate = null;
  let employer = null;
  let { _id, email } = req.body;

  email = email?.toLowerCase();

  if (!_id || _id <= 0) {
    return res.status(401).send({ msg: "Id not present!" });
  }

  user = await User.findById(_id);
  if (!user) {
    return res.status(404).send({ msg: "User does not exists!" });
  }

  user = user.toObject();

  if (user.type === "candidate") {
    candidate = await Candidate.findOne({ userId: user._id }, "uploads");
    if (!candidate) {
      return res.status(404).send({ msg: "Candidate does not exists." });
    }
    user.candidateId = candidate._id;
    user.candidate = candidate;
  }
  if (user.type === "employer") {
    employer = await Employer.findOne({ userId: user._id });
    if (!employer) {
      return res.status(404).send({ msg: "Employer does not exists." });
    }
    user.employer = employer;
    let subscription = await Subscription.findOne({ email });
    if (subscription) {
      subscription =
        subscription?.id?.includes("pi") &&
        subscription?.amount === 500 &&
        moment().isBefore(subscription?.expiry)
          ? "active"
          : (await stripe?.subscriptions?.retrieve(subscription?.id))?.status;
    }
    user.subscriptionStatus = subscription || "inActive";
  }
  res.status(200).json(user);
};

const getPayment = async (req, res) => {
  const { number, exp_month, exp_year, cvc } = req.body;

  if (req.body.type !== "employer") {
    res.status(409).send("User is not an Employer");
  } else {
    var token = await stripe.tokens.create({
      card: { number, exp_month, exp_year, cvc },
    });
    if (!token) {
      res.status(409).send("Card details not entered correctly");
    }
    var customer = await stripe.customers.create({
      email: req.body.email.toLowerCase(),
      name: `${req.body.forename} ${req.body.surname}`,
      source: token.id,
    });
  }

  const charge = await stripe.charges.create({
    amount: 600,
    currency: "usd",
    source: token.card.id,
    customer: customer.id,
    description: "One time registration fee",
  });
  if (!charge) {
    res.status(409).send("Payment not successful");
  } else {
    res.status(200).send("Payment successful");
  }
};

module.exports = {
  login,
  signUp,
  getById,
  getPayment,
  resetPassword,
  deleteProfile,
  changePassword,
  forgotPassword,
};
