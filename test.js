console.log(process.env.NODE_ENV);
const obj = {
  name: 'alek'
}

const config = require("./src/config/app.json");
// console.log("config = ", config);

// console.log('obj name = ', obj.name);

// const handler = {}
// handler.get = function (target, prop, receiver) {
//   // console.log("target = ", target);
//   // console.log("prop = ", prop);
//   // console.log("receiver = ", receiver);
//   // return "alelkye";
//   if (prop === 'root') {
//     return "alekye";
//   }
//   return target[prop];
// }

// const fixedConfig = new Proxy(config, handler);
// console.log("fixedConfig == ", fixedConfig);
// console.log('version  = ', fixedConfig.version);
// console.log('fixed root = ', fixedConfig.root);
// console.log('dateDirFormat = ', fixedConfig.dateDirFormat);

const Config = require("./src/Utils/Config");
const appConfig = Config.getAppConfig();
console.log("appConfig = ", appConfig);