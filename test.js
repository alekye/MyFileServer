const path = require("path");
const config = require("./src/config/app.json");
console.log("config = ", config);
if (path.isAbsolute(config.root)) {
  console.log("is absolute path.");
} else {
  console.log("is not absolute path!");
}