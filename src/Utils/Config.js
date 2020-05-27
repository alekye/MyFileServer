const fs = require("fs");
const path = require("path");

const Json5Module = require("json5"); // webpack 打包后，添加了 default
const JSON5 = Json5Module.default || Json5Module;

console.log("JSON5 === ", JSON5);

const conf = {};

const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
  }
  return content;
}
// 加载json文件
const loadJsonFile = (fileName) => {
  const filePath = path.join(process.mainModule.path, "config", fileName);
  // console.log('filePath = ', filePath);
  const content = fs.readFileSync(filePath, "utf8");
  const jsonObject = JSON5.parse(stripBOM(content));
  return jsonObject;
};

// 获取App的配置信息
const AppConfigHandler = {};
AppConfigHandler.get = (target, prop, receiver) => {
  const val = target[prop];
  if (prop === 'root' && val) {
    if (!path.isAbsolute(val)) {
      return path.join(process.mainModule.path, val);
    }
  }
  return val;
}
conf.getAppConfig = () => {
  let appConfig = loadJsonFile("app.json5");
  if (process.env.NODE_ENV === "development") {
    const devConfig = loadJsonFile("dev.json5");
    appConfig = Object.assign(appConfig, devConfig);
  }

  let fixedConfig = new Proxy(appConfig, AppConfigHandler);
  return fixedConfig;
}

module.exports = conf;
