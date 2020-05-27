const log4js = require("log4js");
const Config = require("../Utils/Config");
const appConfig = Config.getAppConfig();

const logConfig = {
  pm2: appConfig.pm2Cluster,
  appenders: {
    out: { type: "console" },
    file: {
      type: "dateFile",
      filename: "./logs/run.log",
      daysToKeep: 30,
      pattern: ".yyyy-MM-dd",
      keepFileExt: true,
    },
  },
  categories: {
    default: { appenders: ["out", "file"], level: "debug" },
  },
};
log4js.configure(logConfig);
const log = log4js.getLogger();
log.info("logConfig === ", logConfig);
module.exports = log;
