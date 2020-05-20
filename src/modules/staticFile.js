const path = require("path");
const express = require("express");
const Config = require("../Utils/Config");
const appConfig = Config.load("app.json");

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

const fileDir = path.join(process.mainModule.path, appConfig.fileDir);
console.log("fileDir = ", fileDir);

module.exports = express.static(fileDir, options);
