const log4js = require("log4js");

module.exports = log4js.configure({
  appenders: {
    fileAppender: {
      type: "dateFile",
      pattern: ".yyyy-MM-dd-hh",
      compress: true,
      filename: "./app/logger/logfile.log",
      daysToKeep: 2,
    },
  },
  categories: {
    default: {
      appenders: ["fileAppender"],
      level: ["ALL"],
    },
  },
});
