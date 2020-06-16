const log4js = require("log4js");

const utility = require("../../utils/utility");
const resConstants = require("../../constant/responseConstants");
const db = require("../../models/sequelize");
const jwtToken = require("../../jwtTokenValidation/jwtValidation");
const validationSchema = require("./validationSchema/badgesValidationSchema");
require("../../config/loggerConfig");

const Badges = db.badges;
const logger = log4js.getLogger();

module.exports.create = async (req, res) => {
  let userData = await jwtToken.getData(req.headers["authorization"]);
  //validation schema
  const schema = validationSchema.insertSchema();
  // Create a badges object
  const badges = {
    org_id: req.params.organisation_id,
    name: req.body.name,
    hi5_count_required: req.body.hi5_count_required,
    hi5_frequency: req.body.hi5_frequency,
  };
  logger.info("executing create badges");
  logger.info("user id:" + userData.userId);
  logger.info(JSON.stringify(badges));
  logger.info("=========================================");

  schema
    .validate(badges, { abortEarly: false })
    .then(() => {
      // Save badges in the database
      Badges.create(badges)
        .then((data) => {
          res.status(201).send({
            data: data,
          });
        })
        .catch(() => {
          logger.error("executing create badges");
          logger.info("user id:" + userData.userId);
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
          resConstants.INVALID_BADGES_CODE,
          resConstants.INVALID_BADGES_MESSAGE,
          err.errors
        ),
      });
    });
};
//get all badges
module.exports.findAll = async (req, res) => {
  let userData = await jwtToken.getData(req.headers["authorization"]);
  const org_id = req.params.organisation_id;
  const idSchema = validationSchema.findAllSchema();
  idSchema
    .validate({ org_id }, { abortEarly: false })
    .then(() => {
      Badges.findAll({ where: { org_id: req.params.organisation_id } })
        .then((data) => {
          res.status(200).send({
            data: data,
          });
        })
        .catch(() => {
          logger.error("executing findAll badges");
          logger.info("user id:" + userData.userId);
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
          resConstants.INVALID_BADGES_CODE,
          resConstants.INVALID_BADGES_MESSAGE,
          err.errors
        ),
      });
    });
};

//get badges with id
module.exports.findOne = async (req, res) => {
  let userData = await jwtToken.getData(req.headers["authorization"]);
  const id = req.params.id;
  const org_id = req.params.organisation_id;
  const idSchema = validationSchema.findOneSchema();
  idSchema
    .validate({ id, org_id }, { abortEarly: false })
    .then(() => {
      Badges.findAll({ where: { org_id: org_id, id: id } })
        .then((data) => {
          if (data.length != 0) {
            res.status(200).send({
              data: data,
            });
          } else {
            logger.error("executing findOne badge");
            logger.info("user id:" + userData.userId);
            logger.error("Badge not found for specified id");
            logger.info("=========================================");
            res.status(404).send({
              error: {
                message: "Badge not found for specified id",
              },
            });
          }
        })
        .catch(() => {
          logger.error("executing findOne badge");
          logger.info("user id:" + userData.userId);
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
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          resConstants.INVALID_BADGES_CODE,
          resConstants.INVALID_BADGES_MESSAGE,
          err.errors
        ),
      });
    });
};

//update badges with id
module.exports.update = async (req, res) => {
  let userData = await jwtToken.getData(req.headers["authorization"]);
  const id = req.params.id;
  const org_id = req.params.organisation_id;
  const name = req.body.name;
  const hi5_count_required = req.body.hi5_count_required;
  const hi5_frequency = req.body.hi5_frequency;
  const schema = validationSchema.updateSchema();
  const badges = {
    name: req.body.name,
    hi5_count_required: req.body.hi5_count_required,
    hi5_frequency: req.body.hi5_frequency,
  };
  logger.info("executing update badges");
  logger.info("user id:" + userData.userId);
  logger.info(JSON.stringify(badges));
  logger.info("=========================================");
  schema
    .validate(
      { id, org_id, name, hi5_count_required, hi5_frequency },
      { abortEarly: false }
    )
    .then(() => {
      Badges.update(badges, {
        returning: true,
        where: { id: id, org_id: org_id },
      })
        .then(([rowsUpdate, [updatedBadges]]) => {
          if (rowsUpdate == 1) {
            res.status(200).send({
              data: updatedBadges,
            });
          } else {
            logger.error("executing update badges");
            logger.info("user id:" + userData.userId);
            logger.error("Badge not found for specified id");
            logger.info("=========================================");
            res.status(404).send({
              error: {
                message: "Badge not found for specified id",
              },
            });
          }
        })
        .catch(() => {
          logger.error("executing update badges");
          logger.info("user id:" + userData.userId);
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
          resConstants.INVALID_BADGES_CODE,
          resConstants.INVALID_BADGES_MESSAGE,
          err.errors
        ),
      });
    });
};
