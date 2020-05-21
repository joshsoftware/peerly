const log4js = require("log4js");

module.exports = log4js.configure({
  appenders: {
    fileAppender: {
      type: "file",
      filename: "./app/logger/logfile.log",
    },
  },
  categories: {
    default: {
      appenders: ["fileAppender"],
      level: ["ALL"],
    },
  },
});
