const winston = require("winston");

module.exports = () => {
  process.on("unhandledRejection", (exception) => {
    throw exception;
  });
  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      level: "error",
      handleExceptions: true,
      format: winston.format.prettyPrint(),
    })
  );
};
