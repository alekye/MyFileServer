const path = require("path");
const express = require("express");
const Config = require("../Utils/Config");
const appConfig = Config.getAppConfig();
const log = require("./logger");

// 静态文件配置
var options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html"],
  index: "index.html",
  // maxAge: 0,
  redirect: false,
  setHeaders: function(res, path, stat) {
    res.set("x-timestamp", Date.now());
  }
};

const rootDir = appConfig.root;
log.info("static file dir = ", rootDir);

module.exports = express.static(rootDir, options);
