const path = require("path");
const jwt = require("jsonwebtoken");
const faker = require("faker");
const moment = require("moment");
const dotEnvPath = path.resolve("../.env");
require("dotenv").config({ path: dotEnvPath });
module.exports.createToken = (roleId, orgId, userId) => {
  let token = jwt.sign(
    {
      iss: "node.peerly.com",
      sub: userId,
      aud: "peerly.com",
      nbf: moment.utc().unix(),
      "https://peerly.com": {
        roleId: roleId,
        orgId: orgId,
        orgName: faker.internet.domainName(),
      },
    },
    process.env.JWT_SECRET_KEY, //eslint-disable-line  no-undef
    {
      expiresIn: process.env.JWT_EXPIRE_TIME, //eslint-disable-line  no-undef
    }
  );
  return token;
};
