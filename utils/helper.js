const fs = require("fs");
const moment = require("moment");
const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const nodeMailer = async ({ to, subject, html }) => {
  let emailSent = true;
  try {
    await mailTransporter.sendMail({
      to,
      from: process.env.NODEMAILER_USER,
      subject,
      html,
    });
  } catch (err) {
    emailSent = false;
    console.error("msg: Email Sending Failed!");
  }

  return emailSent;
};

const removeKeys = (data, keysToDelete) => {
  for (const key in data) {
    keysToDelete.includes(key) && delete data[key];
  }
  return data;
};

const checkUnique = ({ arr, key, name }) => {
  const err = Error((name || key) + " must be unique");
  if (key) {
    arr.forEach((x) => {
      if (arr.filter((y) => y[key] === x[key]).length > 1) {
        throw err;
      }
    });
  } else {
    arr.forEach((x) => {
      if (arr.filter((y) => y === x).length > 1) {
        throw err;
      }
    });
  }
};

const accessLevel = (role, accessLevel) => {
  const array = [
    {
      role: ["Admin", "Human Resource", "Employee"],
      accessLevel: "All",
    },
    { role: ["Admin", "Human Resource"], accessLevel: "AdminHr" },
  ];
  const access = array.find((item) => item.accessLevel === accessLevel && item.role.includes(role));
  if (!access) {
    return false;
  }

  return true;
};

const parseTime = (startTime, stopTime) => {
  let d = new Date();
  let d2 = new Date();
  if (!startTime || !stopTime) return null;

  let time = startTime.match(/(\d+)(:(\d\d))?\s*(p?)/);
  d.setHours(parseInt(time[1]) + (startTime.split("")[6] === "p" ? 12 : 0));
  d.setMinutes(parseInt(time[3]) || 0);
  d.setSeconds(0, 0);
  startTime = d;

  let time2 = stopTime.match(/(\d+)(:(\d\d))?\s*(p?)/);
  d2.setHours(parseInt(time2[1]) + (stopTime.split("")[6] === "p" ? 12 : 0));
  d2.setMinutes(parseInt(time2[3]) || 0);
  d2.setSeconds(0, 0);
  stopTime = d2;

  let value = (stopTime - startTime) / (1000 * 60);

  const hours = Math.floor(value / 60);
  const minutes = Math.floor(value % 60);

  return `${hours}hr ${minutes}min`;
};

const amPmFormatter = (time) => {
  let hours = time.split(":")[0];
  let minutes = parseInt(time.split(":")[1]);
  const amPm = parseInt(hours) >= 12 ? "pm" : "am";
  hours = parseInt(hours) % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours < 10 ? `0${hours}:${minutes} ${amPm}` : `${hours}:${minutes} ${amPm}`;

  return strTime;
};

const amPmTwentyFourFormatter = (time) => {
  const amPm = time?.split("")[6];
  const minutes = time?.split(" ")[0].split(":")[1];
  let hours = null;
  if (amPm === "p" && time?.split(":")[0] === "12") {
    hours = 12;
  } else if (amPm === "a" && time?.split(":")[0] === "00") {
    hours = 0;
  } else {
    hours = amPm === "p" ? parseInt(time.split(":")[0]) + 12 : parseInt(time.split(":")[0]);
  }
  const formattedTime = hours > 10 ? `${hours}:${minutes}` : `0${hours}:${minutes}`;

  return formattedTime;
};

const getBusinessDatesCount = (startDate, endDate) => {
  let count = 0;

  const curDate = new Date(startDate.getTime());
  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();
    if (!(dayOfWeek in [0, 6])) count++;
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
};

const convertArrayOfString = (array) => {
  const result = array.reduce((items, value) => ({ ...items, [value]: 1 }), {});

  return result;
};

const convertArrayOfObjectForSorting = (array) => {
  const result = array.reduce(
    (acc, { columnName, selected }) => ((acc[columnName] = selected === "DESC" ? -1 : 1), acc),
    {}
  );

  return result;
};

const convertArrayOfObject = (array, splitName = true) => {
  if (splitName) {
    const index = array.findIndex((ele) => ele.columnName === "name");
    let firstName = [];
    let lastName = [];

    if (index !== -1) {
      for (let key in array[index].selected) {
        firstName.push(array[index].selected[key].split(" ")[0]);
        lastName.push(array[index].selected[key].split(" ")[1]);
      }
      array[index].selected = firstName;
      array.push({
        columnName: "lastName",
        selected: lastName,
      });
    }
  }

  const result = array.reduce((acc, { columnName, selected }) => {
    if (selected?.length) {
      acc[columnName] = { $in: selected };
    }
    return acc;
  }, {});

  return result;
};

const convertArrayOfObjectForSearch = (array) => {
  const result = array.reduce((acc, { columnName, selected }) => {
    if (selected) {
      acc[columnName] = new RegExp(selected, "i");
    }
    return acc;
  }, {});

  return result;
};

const removeObjectKey = (obj, addEmployeeNameKeys = true) => {
  for (let key in obj) {
    if (addEmployeeNameKeys && key === "name") {
      obj = {
        ...obj,
        "employee.firstName": obj[key],
        "employee.lastName": obj[key],
      };

      delete obj[key];
    } else if (!addEmployeeNameKeys && key === "name") {
      obj = {
        ...obj,
        firstName: obj[key],
        lastName: obj[key],
      };

      delete obj[key];
    }
  }

  return obj;
};

const isDatePast = (date, currentDate = new Date(), equal) => {
  const todayDate = moment(currentDate, "DD-MM-YYYY");
  const pastDate = moment(date, "DD-MM-YYYY");
  const dDiff = pastDate.diff(todayDate);

  return dDiff < 0 && moment(currentDate).format("YYYY-MM-DD") !== moment(date).format("YYYY-MM-DD")
    ? true
    : false;
};

const checkValidFileTypes = ({ base64, validFileTypes }) => {
  const type = base64.split(";")[0].split("/")[1];
  const contentType = base64.split(";")[0].split(":")[1];

  return { valid: validFileTypes.includes(type) ? true : false, type: contentType };
};

const parseMiddleWare = (req, res, next, arr, full) => {
  if (full) {
    req.query = JSON.parse(req.query[0]);
  } else {
    arr.forEach((x) => {
      req.query[x] = req.query[x] ? JSON.parse(req.query[x]) : req.query[x];
    });
  }
  next();
};

module.exports = {
  nodeMailer,
  parseTime,
  isDatePast,
  removeKeys,
  accessLevel,
  checkUnique,
  amPmFormatter,
  parseMiddleWare,
  removeObjectKey,
  checkValidFileTypes,
  convertArrayOfString,
  convertArrayOfObject,
  getBusinessDatesCount,
  amPmTwentyFourFormatter,
  convertArrayOfObjectForSearch,
  convertArrayOfObjectForSorting,
};
