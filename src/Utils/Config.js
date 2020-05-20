const fs = require("fs");
const path = require("path");

const conf = {};

function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

conf.load = (fileName) => {
  const filePath = path.join(process.mainModule.path, "config", fileName);
  // console.log('filePath = ', filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const jsonObject = JSON.parse(stripBOM(content));
  return jsonObject
}

module.exports = conf;