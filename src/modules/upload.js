const formidable = require("formidable");
const swagger = require("./swagger");
const log = require("./logger");
const path = require("path");
const fs = require("fs");
const Config = require("../Utils/Config");
const appConfig = Config.load("app.json");
const moment = require("moment");

const API_UPLOAD = appConfig.url || "/file/upload";
const fileDir = appConfig.fileDir || "file";
const MAX_FILE_SIZE = appConfig.maxFileSize || 209715200; // 200 * 1024 * 1024

const upload = {};

upload.init = (app) => {
  const rootDir = Config.getRootDir();
  log.info("rootDir 2 = ", rootDir);
  // 上传文件
  app.post(API_UPLOAD, async (req, res) => {
    let relativeDir = fileDir;
    if (appConfig.dateDirFormat) {
      relativeDir = path.join(
        relativeDir,
        moment().format(appConfig.dateDirFormat)
      );
    }
    const fullDir = path.join(rootDir, relativeDir);
    if (!fs.existsSync(fullDir)) {
      // 创建目录
      fs.mkdirSync(fullDir, { recursive: true });
    }
    log.info("upload fullDir = ", fullDir);
    const form = formidable({
      encoding: "utf-8",
      uploadDir: fullDir,
      multiples: true,
      keepExtensions: true,
      maxFileSize: MAX_FILE_SIZE, // 10mb
      maxFields: 100,
      maxFieldsSize: 1 * 1024 * 1024,
    });
    form.parse(req, (err, fields, files) => {
      if (err) {
        log.error("upload error = ", err);
        res.status(500).json(err);
        return;
      }
      if (files && files.file) {
        const f = files.file;
        const data = {};
        data.size = f.size;
        data.name = f.name;
        data.type = f.type;
        data.mtime = f.mtime;
        data.path = `${relativeDir}/${path.basename(f.path)}`;
        log.info("upload file: ", data.path);
        res.json(data);
      } else {
        res.status(400).json("file 字段不存在！");
      }
    });
  });
  // 上传文件接口文档
  swagger.addQuery(API_UPLOAD, "post", "上传文件", "上传", {});
};

module.exports = upload;
