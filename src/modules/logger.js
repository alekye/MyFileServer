const log4js = require("log4js");

log4js.configure({
  appenders: {
    out: { type: 'console' },
    file: {
      type: "dateFile",
      filename: "logs/thing.log",
      daysToKeep: 30,
      pattern: ".yyyy-MM-dd",
      keepFileExt: true
    },
  },
  categories: {
    default: { appenders: ["out", "file"], level: "debug" },
  },
});

const logger = log4js.getLogger();
module.exports = logger;