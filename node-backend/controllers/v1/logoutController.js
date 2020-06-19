const log4js = require("log4js");

const db = require("../../models/sequelize");
const jsonwebtoken = require("../../jwtTokenValidation/jwtValidation");
const utility = require("../../utils/utility");
const resConstants = require("../../constant/responseConstants");
const userBlacklistedTokens = db.user_blacklisted_tokens;
require("../../config/loggerConfig");

const logger = log4js.getLogger();

module.exports.logout = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let decode = await jsonwebtoken.getData(authHeader);
  const user = {
    user_id: decode.userId,
    token: token,
    expires_at: decode.exp,
  };
  logger.info("executing logout");
  logger.info("user id: " + decode.userId);
  logger.info(JSON.stringify(user));
  logger.info("=========================================");
  userBlacklistedTokens
    .create(user)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      logger.error("executing logout");
      logger.info("user id: " + decode.userId);
      logger.error(resConstants.INTRENAL_SERVER_ERROR_MESSAGE);
      logger.info("=========================================");
      res
        .status(500)
        .send(
          utility.getErrorResponseObject(
            resConstants.INTRENAL_SERVER_ERROR_CODE,
            resConstants.INTRENAL_SERVER_ERROR_MESSAGE
          )
        );
    });
};
