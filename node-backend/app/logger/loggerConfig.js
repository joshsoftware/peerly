const log4js = require("log4js");

module.exports = log4js.configure({
  appenders: {
    fileAppender: {
      type: "dateFile",
      pattern: ".yyyy-ww",
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
