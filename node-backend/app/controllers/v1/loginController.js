const jwt = require("jsonwebtoken");
const moment = require("moment");
const log4js = require("log4js");

const db = require("../../models/sequelize");
require("../../logger/loggerConfig");

const logger = log4js.getLogger();
const Users = db.users;
const Organizations = db.organizations;
module.exports.login = async (req, res) => {
  let profile = req.user;
  let email = profile.emails[0].value;
  let expTime;
  let result = await getUser(email);
  if (result == "error") {
    res.status(500).send({
      error: {
        message: "internal server error",
      },
    });
  } else if (result[1].rowCount) {
    expTime = {
      expiresIn: process.env.JWT_EXPIRE_TIME, //eslint-disable-line  no-undef
    };
    const token = jwt.sign(
      {
        iss: "node.peerly.com",
        sub: result[0][0].id,
        aud: "peerly.com",
        nbf: moment.utc().unix(),
        "https://peerly.com": {
          roleId: result[0][0].roleid,
          orgId: result[0][0].orgid,
          orgName: result[0][0].name,
        },
      },
      process.env.JWT_SECRET_KEY, //eslint-disable-line  no-undef
      expTime,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME, //eslint-disable-line  no-undef
      }
    );
    res.status(200).send({
      data: {
        token: token,
      },
    });
  } else {
    let domainName = profile.emails[0].value.split("@").pop();
    let domainResult = await getOrganization(domainName);
    if (domainResult == "error") {
      res.status(500).send({
        error: {
          message: "internal server error",
        },
      });
    } else if (domainResult) {
      let checkerror = await insertData(
        domainResult.id,
        profile.name.givenName,
        profile.name.familyName,
        email,
        profile.displayName,
        domainResult.hi5_limit
      );
      if (checkerror == "error") {
        res.status(500).send({
          error: {
            message: "internal server error",
          },
        });
      } else {
        let getUserResult = await getUser(email);
        if (getUserResult[1].rowCount) {
          expTime = {
            expiresIn: process.env.JWT_EXPIRE_TIME, //eslint-disable-line  no-undef
          };
          const token = jwt.sign(
            {
              iss: "node.peerly.com",
              sub: getUserResult[0][0].id,
              aud: "peerly.com",
              nbf: moment.utc().unix(),
              "https://peerly.com": {
                roleId: getUserResult[0][0].roleid,
                orgId: getUserResult[0][0].orgid,
                orgName: getUserResult[0][0].name,
              },
            },
            process.env.JWT_SECRET_KEY, //eslint-disable-line  no-undef
            expTime
          );
          res.status(200).send({
            data: {
              token: token,
            },
          });
        } else {
          logger.error("unauthorized user");
          res.status(401).send({
            error: {
              message: "unauthorized user",
            },
          });
        }
      }
    } else {
      logger.error("unauthorized user");
      res.status(401).send({
        error: {
          message: "unauthorized user",
        },
      });
    }
  }
};

const getUser = async (email) => {
  let result;
  await db.sequelize
    .query(
      "SELECT  roles.id as roleId,organizations.id as orgId,users.id,organizations.name FROM users INNER JOIN organizations ON users.org_id = organizations.id INNER JOIN roles ON users.role_id = roles.id WHERE users.email= '" +
        email +
        "'"
    )
    .then(function (users) {
      result = users;
    })
    .catch((err) => {
      logger.error(err);
      result = "error";
    });
  return result;
};

const getOrganization = async (domainName) => {
  let domainResult;
  await Organizations.findOne({ where: { domain_name: domainName } })
    .then(function (organizationData) {
      domainResult = organizationData;
    })
    .catch((err) => {
      logger.error(err);
      domainResult = "error";
    });
  return domainResult;
};

const insertData = async (
  orgId,
  firstName,
  lastName,
  email,
  displayName,
  hi5QuotaBalance
) => {
  let errorCheck;
  const user = {
    org_id: orgId,
    first_name: firstName,
    last_name: lastName,
    email: email,
    display_name: displayName,
    soft_delete: false,
    role_id: 3,
    hi5_quota_balance: hi5QuotaBalance,
  };
  await Users.create(user).catch((err) => {
    logger.error(err);
    errorCheck = "error";
  });
  return errorCheck;
};
