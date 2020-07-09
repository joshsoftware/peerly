const log4js = require("log4js");

const db = require("../../models/sequelize");
const resConstants = require("../../constant/responseConstants");
const utility = require("../../utils/utility");
const jwtToken = require("../../jwtTokenValidation/jwtValidation");
require("../../config/loggerConfig");

const logger = log4js.getLogger();
const Users = db.users;
const Organizations = db.organizations;

module.exports.login = async (req, res) => {
  let profile = req.user;
  let emailId = profile.emails[0].value;
  Users.findOne({
    where: { email: emailId },
    attributes: ["id", "org_id", "role_id", "soft_delete"],
    include: [
      {
        model: db.organizations,
        attributes: ["name"],
      },
    ],
  })
    .then((data) => {
      if (data) {
        if (data.soft_delete) {
          res
            .status(401)
            .send(
              utility.getErrorResponseObject(
                resConstants.INVALID_ORGANISATION_CODE,
                resConstants.UNAUTHORIZED_USER_MESSAGE
              )
            );
        } else {
          const token = jwtToken.createToken(
            data.role_id,
            data.org_id,
            data.id,
            data.organization.name
          );
          res.status(200).send({
            data: {
              token: token,
            },
          });
        }
      } else {
        newUser(req, res);
      }
    })
    .catch(() => {
      logger.error("executing find user");
      logger.error(resConstants.INTRENAL_SERVER_ERROR_MESSAGE);
      logger.error("=========================================");
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

const newUser = (req, res) => {
  let profile = req.user;
  let emailId = profile.emails[0].value;
  let domainName = emailId.split("@").pop();
  Organizations.findOne({ where: { domain_name: domainName } })
    .then((data) => {
      if (data) {
        const user = {
          org_id: data.id,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: emailId,
          display_name: profile.displayName,
          hi5_quota_balance: data.hi5_limit,
          soft_delete: false,
          role_id: 3,
        };
        logger.info("executing create user");
        logger.info(JSON.stringify(user));
        logger.info("=========================================");
        Users.create(user)
          .then((user) => {
            const token = jwtToken.createToken(
              user.role_id,
              user.org_id,
              user.id,
              data.name
            );
            res.status(200).send({
              data: {
                token: token,
              },
            });
          })
          .catch(() => {
            logger.error("executing create user");
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
      } else {
        logger.error("executing login");
        logger.error(resConstants.UNAUTHORIZED_USER_MESSAGE);
        logger.info("=========================================");
        res
          .status(401)
          .send(
            utility.getErrorResponseObject(
              resConstants.INVALID_ORGANISATION_CODE,
              resConstants.UNAUTHORIZED_USER_MESSAGE
            )
          );
      }
    })
    .catch(() => {
      logger.error("executing find domain name");
      logger.error(resConstants.INTRENAL_SERVER_ERROR_MESSAGE);
      logger.error("=========================================");
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
