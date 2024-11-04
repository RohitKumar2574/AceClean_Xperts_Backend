const crypto = require("crypto");

//Generate a random secure token
const secretKey = crypto.randomBytes(32).toString("hex");

module.exports = {
  secretKey: secretKey,
};
