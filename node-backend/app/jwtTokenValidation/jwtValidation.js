const jwt = require("jsonwebtoken");
const log4js = require("log4js");

const db = require("../models/sequelize");
const utility = require("../utils/utility");
const resConstants = require("../constant/responseConstants");
require("../config/loggerConfig");

const UserBlacklistedTokens = db.user_blacklisted_tokens;
const logger = log4js.getLogger();

module.exports.autheticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null /*eslint-disable-line no-eq-null*/) {
    logger.error("unauthorised user with undefined acess token");
    logger.info("=========================================");
    res
      .status(401)
      .send(
        utility.getErrorResponseObject(
          resConstants.INVALID_TOKEN_CODE,
          resConstants.UNAUTHORIZED_USER_MESSAGE
        )
      );
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
      if (err) {
        logger.error("unauthorised user by rejecting access token");
        logger.info("=========================================");
        res
          .status(401)
          .send(
            utility.getErrorResponseObject(
              resConstants.INVALID_TOKEN_CODE,
              resConstants.UNAUTHORIZED_USER_MESSAGE
            )
          );
      } else {
        UserBlacklistedTokens.findOne({ where: { token: token } }).then(
          (data) => {
            if (data === null) {
              next();
            } else {
              logger.error("unauthorised user");
              logger.info("=========================================");
              res
                .status(401)
                .send(
                  utility.getErrorResponseObject(
                    resConstants.INVALID_TOKEN_CODE,
                    resConstants.UNAUTHORIZED_USER_MESSAGE
                  )
                );
            }
          }
        );
      }
    });
  }
};

module.exports.getData = (authHeader) => {
  const token = authHeader && authHeader.split(" ")[1];
  let decode = jwt.decode(token);
  const tokenData = {
    userId: decode.sub,
    exp: decode.exp,
    roleId: decode["https://peerly.com"].roleId,
    orgId: decode["https://peerly.com"].orgId,
  };
  return tokenData;
};
