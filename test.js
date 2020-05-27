const path = require("path");
const fs = require("fs");
const JSON5 = require("json5");

const loadJsonFile = (fileName) => {
  const filePath = path.join(process.mainModule.path, fileName);
  // console.log('filePath = ', filePath);
  const content = fs.readFileSync(filePath, "utf8");
  return content;
  // const jsonObject = JSON.parse(stripBOM(content));
  // return jsonObject;
};

const data = loadJsonFile("./src/config/app.json");
console.log("data = ", data);

const obj = JSON5.parse(data);
console.log("obj = ", obj);