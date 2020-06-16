const log4js = require("log4js");

const utility = require("../../utils/utility");
const db = require("../../models/sequelize");
const validationSchema = require("./validationSchema/orgValidationSchema");
const jwtValidate = require("../../jwtTokenValidation/jwtValidation");
const resConstants = require("../../constant/responseConstants");
const Organizations = db.organizations;
require("../../config/loggerConfig");

const logger = log4js.getLogger();

module.exports.create = async (req, res) => {
  const userData = await jwtValidate.getData(req.headers["authorization"]);
  const schema = validationSchema.insertSchema();
  // Create a Organization
  const organizations = {
    name: req.body.name,
    contact_email: req.body.contact_email,
    domain_name: req.body.domain_name,
    subscription_status: req.body.subscription_status,
    subscription_valid_upto: req.body.subscription_valid_upto,
    hi5_limit: req.body.hi5_limit,
    hi5_quota_renewal_frequency: req.body.hi5_quota_renewal_frequency,
    timezone: req.body.timezone,
  };
  logger.info("executing create organisation");
  logger.info("user id: " + userData.userId);
  logger.info(JSON.stringify(organizations));
  logger.info("=========================================");

  // Validate request
  schema
    .validate(organizations, { abortEarly: false })
    .then(() => {
      // Save Organization in the database
      Organizations.create(organizations)
        .then((info) => {
          res.status(201).send({
            data: info,
          });
        })
        .catch(() => {
          logger.error("executing find All in organisation");
          logger.info("user id: " + userData.userId);
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
    })
    .catch((err) => {
      logger.error("validation error");
      logger.error(JSON.stringify(err));
      logger.info("=========================================");
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          resConstants.INVALID_ORGANISATION_CODE,
          resConstants.INVALID_ORGANISATION_MESSAGE,
          err.errors
        ),
      });
    });
};

module.exports.findAll = async (req, res) => {
  const userData = await jwtValidate.getData(req.headers["authorization"]);
  Organizations.findAll()
    .then((info) => {
      res.status(200).send({
        data: info,
      });
    })
    .catch(() => {
      logger.error("executing find All in organisation");
      logger.info("user id: " + userData.userId);
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

module.exports.findOne = async (req, res) => {
  const userData = await jwtValidate.getData(req.headers["authorization"]);
  const idSchema = validationSchema.getByIdSchema();
  idSchema
    .validate({ id: req.params.id }, { abortEarly: false })
    .then(() => {
      const id = req.params.id;
      Organizations.findByPk(id)
        .then((info) => {
          if (info !== null) {
            res.status(200).send({
              data: info,
            });
          } else {
            logger.error("executing find one in organisation");
            logger.info("user id: " + userData.userId);
            logger.error(resConstants.ORGANISATION_NOT_FOUND_MESSAGE);
            logger.info("=========================================");
            res
              .status(404)
              .send(
                utility.getErrorResponseObject(
                  resConstants.ORGANISATION_NOT_FOUND_CODE,
                  resConstants.ORGANISATION_NOT_FOUND_MESSAGE
                )
              );
          }
        })
        .catch(() => {
          logger.error("executing find one in organisation");
          logger.info("user id: " + userData.userId);
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
    })
    .catch((err) => {
      logger.error("validation error");
      logger.error(JSON.stringify(err));
      logger.info("=========================================");
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          resConstants.INVALID_ORGANISATION_CODE,
          resConstants.INVALID_ORGANISATION_MESSAGE,
          err.errors
        ),
      });
    });
};

module.exports.update = async (req, res) => {
  const userData = await jwtValidate.getData(req.headers["authorization"]);
  const id = req.params.id;
  const schema = validationSchema.updateSchema();
  const idSchema = validationSchema.getByIdSchema();
  idSchema
    .isValid({
      id: req.params.id,
    })
    .then((valid) => {
      if (!valid) {
        logger.error("executing update organisation");
        logger.info("organisation id: " + id);
        logger.error(resConstants.INVALID_ORGANISATION_MESSAGE);
        logger.info("=========================================");
        res.status(400).send({
          error: {
            code: resConstants.INVALID_ORGANISATION_CODE,
            message: resConstants.INVALID_ORGANISATION_MESSAGE,
            fields: {
              id: "should be number",
            },
          },
        });
      } else {
        const organizations = {
          name: req.body.name,
          contact_email: req.body.contact_email,
          domain_name: req.body.domain_name,
          subscription_status: req.body.subscription_status,
          subscription_valid_upto: req.body.subscription_valid_upto,
          hi5_limit: req.body.hi5_limit,
          hi5_quota_renewal_frequency: req.body.hi5_quota_renewal_frequency,
          timezone: req.body.timezone,
        };
        logger.info("executing update organisation");
        logger.info("organisation id: " + id);
        logger.info(JSON.stringify(organizations));
        logger.info("=========================================");

        schema
          .validate(organizations, { abortEarly: false })
          .then(() => {
            Organizations.update(organizations, {
              returning: true,
              where: { id: id },
            })
              .then(([rowsUpdate, [updatedCoreValue]]) => {
                if (rowsUpdate == 1) {
                  res.status(200).send({
                    data: updatedCoreValue,
                  });
                } else {
                  logger.error("Error executing update organisation");
                  logger.info("user id: " + userData.userId);
                  logger.error(resConstants.ORGANISATION_NOT_FOUND_MESSAGE);
                  logger.info("=========================================");
                  res
                    .status(404)
                    .send(
                      utility.getErrorResponseObject(
                        resConstants.ORGANISATION_NOT_FOUND_CODE,
                        resConstants.ORGANISATION_NOT_FOUND_MESSAGE
                      )
                    );
                }
              })
              .catch(() => {
                logger.error("Error executing update organisation");
                logger.info("user id: " + userData.userId);
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
          })
          .catch((err) => {
            logger.error("validation error");
            logger.error(JSON.stringify(err));
            logger.info("=========================================");
            res.status(400).send({
              error: utility.getFormattedErrorObj(
                resConstants.INVALID_ORGANISATION_CODE,
                resConstants.INVALID_ORGANISATION_MESSAGE,
                err.errors
              ),
            });
          });
      }
    });
};
