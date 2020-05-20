const formidable = require("formidable");
const swagger = require("./swagger");
const log = require("./logger");
const path = require("path");
const fs = require("fs");
const Config = require("../Utils/Config");
const appConfig = Config.load("app.json");
const moment = require("moment");

const API_UPLOAD = "/api/upload";
const UPLOAD_DIR = "files/images";

const upload = {};

upload.init = (app) => {
  const publicDir = path.join(process.mainModule.path, appConfig.fileDir);
  log.info("publicDir = ", publicDir);
  // 上传文件
  app.post(API_UPLOAD, async (req, res) => {
    const imagesDir = path.join(UPLOAD_DIR, moment().format("YYYYMMDD"));
    const fullImagesDir = path.join(publicDir, imagesDir);
    if (!fs.existsSync(fullImagesDir)) {
      // 创建目录
      fs.mkdirSync(fullImagesDir, { recursive: true });
    }
    log.info("uploadfile dir = ", fullImagesDir);
    const form = formidable({
      encoding: "utf-8",
      uploadDir: fullImagesDir,
      multiples: true,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10mb
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
        data.path = `${imagesDir}/${path.basename(f.path)}`;
        log.info("upload file: ", data.path);
        res.json(data);
      } else {
        // throw new Error("file 字段不存在！");
        res.status(400).json("file 字段不存在！");
      }
    });
  });
  // 上传文件接口文档
  swagger.addQuery(API_UPLOAD, "post", "上传文件", "上传", {});
};

module.exports = upload;
