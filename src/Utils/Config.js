const fs = require("fs");
const path = require("path");

const conf = {};

function stripBOM(content) {
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
  }
  return content;
}

conf.load = (fileName) => {
  const filePath = path.join(process.mainModule.path, "config", fileName);
  // console.log('filePath = ', filePath);
  const content = fs.readFileSync(filePath, "utf8");
  const jsonObject = JSON.parse(stripBOM(content));
  return jsonObject;
};

conf.getRootDir = () => {
  const appConfig = conf.load("app.json");
  let rootDir = "/tmp";
  if (process.env.NODE_ENV === "development") {
    rootDir = path.join(process.mainModule.path, "./wwwroot");
  } else {
    if (appConfig.root) {
      if (path.isAbsolute(appConfig.root)) {
        rootDir = appConfig.root;
      } else {
        rootDir = path.join(process.mainModule.path, appConfig.root);
      }
    }
  }

  return rootDir;
};

module.exports = conf;
