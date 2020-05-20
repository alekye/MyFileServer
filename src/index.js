const express = require("express");
require("express-async-errors");
const Config = require("./Utils/Config");
const appConfig = Config.load("app.json");

const app = express();

// 把body解析成json对象
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API文档
const swagger = require("./modules/swagger");
swagger.init(app);
// 静态文件服务
const staticFile = require("./modules/staticFile");
app.use(staticFile);

// 上传文件
const upload = require("./modules/upload");
upload.init(app);

// 跨域
var cors = require('cors')
app.use(cors());

// 未知路由处理
app.use((req, res) => {
  res.status(404);
  throw new Error("请求地址不存在！");
});
// 统一错误处理
app.use(async (err, req, res, next) => {
  console.error("======= error @ Server: ", err.message);
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json(err.message);
});
// 启动http服务
const port = appConfig.port || 3030;
app.listen(port, () => console.log(`Server @ http://localhost:${port}!`));
