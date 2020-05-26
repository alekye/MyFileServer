const express = require("express");
require("express-async-errors");
const Config = require("./Utils/Config");
const appConfig = Config.load("app.json");
const log = require("./modules/logger");

const app = express();

// 把body解析成json对象
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 跨域
var cors = require("cors");
app.use(cors());

// API文档
const swagger = require("./modules/swagger");
swagger.init(app);
// 静态文件服务
const staticFile = require("./modules/staticFile");
app.use(staticFile);

// 上传文件
const upload = require("./modules/upload");
upload.init(app);

// 未知路由处理
app.use((req, res) => {
  res.status(404);
  log.warn("404: ", req.url, "query = ", req.query, "body = ", req.body);
  throw new Error("请求地址不存在！");
});
// 统一错误处理
app.use(async (err, req, res, next) => {
  log.error("统一错误处理：", err.message);
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json(err.message);
});
// 启动http服务
const port = appConfig.port || 3030;
const host = appConfig.host || "localhost";
app.listen(port, host, () =>
  console.log(`Server @ http://${host}:${port} started!`)
);
