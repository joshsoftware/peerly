const log4js = require("log4js");

const getDatePattern = () => {
  return process.env.LOGGER_ROLLING_TIME;
};

module.exports = log4js.configure({
  appenders: {
    fileAppender: {
      type: "dateFile",
      pattern: getDatePattern(),
      compress: false,
      filename: "./app/logger/logfile.log",
      backups: 3,
    },
  },
  categories: {
    default: {
      appenders: ["fileAppender"],
      level: ["ALL"],
    },
  },
});
