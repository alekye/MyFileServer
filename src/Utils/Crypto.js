const crypto = require('crypto');
const mod = {};

mod.md5 = function (str) {
  if (!str) {
    return "";
  }
  const mod = crypto.createHash('md5');
  const result = mod.update(str).digest('hex');
  return result;
}

module.exports = mod;