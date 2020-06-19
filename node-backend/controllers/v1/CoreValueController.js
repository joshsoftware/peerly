const log4js = require("log4js");

const utility = require("../../utils/utility");
const db = require("../../models/sequelize");
const validationSchema = require("./validationSchema/coreValueValidationSchema");
const jwtToken = require("../../jwtTokenValidation/jwtValidation");
const resConstants = require("../../constant/responseConstants");
require("../../config/loggerConfig");

const CoreValue = db.core_values;
const logger = log4js.getLogger();

module.exports.create = async (req, res) => {
  let userData = await jwtToken.getData(req.headers["authorization"]);
  //validation schema
  const schema = validationSchema.insertSchema();
  // Create a core value object

  const coreValue = {
    org_id: req.params.organisation_id,
    text: req.body.text,
    description: req.body.description,
    parent_core_value_id: req.body.parent_core_value_id,
    thumbnail_url: req.body.thumbnail_url,
  };

  logger.info("executing create core value");
  logger.info("user id:" + userData.userId);
  logger.info(JSON.stringify(coreValue));
  logger.info("=========================================");

  schema
    .validate(coreValue, { abortEarly: false })
    .then(() => {
      // Save coreValue in the database
      CoreValue.create(coreValue)
        .then((data) => {
          res.status(201).send({
            data: data,
          });
        })
        .catch(() => {
          logger.error("executing create core value");
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
          resConstants.INVALID_CORE_VALUE_CODE,
          resConstants.INVALID_CORE_VALUE_MESSAGE,
          err.errors
        ),
      });
    });
};
//get all core values
module.exports.findAll = async (req, res) => {
  let userData = await jwtToken.getData(req.headers["authorization"]);
  const org_id = req.params.organisation_id;
  const idSchema = validationSchema.findAllSchema();
  idSchema
    .validate({ org_id }, { abortEarly: false })
    .then(() => {
      CoreValue.findAll({ where: { org_id: req.params.organisation_id } })
        .then((data) => {
          res.status(200).send({
            data: data,
          });
        })
        .catch(() => {
          logger.error("executing findAll core value");
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
          resConstants.INVALID_CORE_VALUE_CODE,
          resConstants.INVALID_CORE_VALUE_MESSAGE,
          err.errors
        ),
      });
    });
};

//get core value with id
module.exports.findOne = async (req, res) => {
  let userData = await jwtToken.getData(req.headers["authorization"]);
  const id = req.params.id;
  const org_id = req.params.organisation_id;
  const idSchema = validationSchema.findOneSchema();
  idSchema
    .validate({ id, org_id }, { abortEarly: false })
    .then(() => {
      CoreValue.findOne({ where: { org_id: org_id, id: id } })
        .then((data) => {
          if (data.length != 0) {
            res.status(200).send({
              data: data,
            });
          } else {
            logger.error("executing findOne core value");
            logger.info("user id:" + userData.userId);
            logger.error(resConstants.CORE_VALUE_NOT_FOUND_MESSAGE);
            logger.info("=========================================");
            res
              .status(404)
              .send(
                utility.getErrorResponseObject(
                  resConstants.CORE_VALUE_NOT_FOUND_CODE,
                  resConstants.CORE_VALUE_NOT_FOUND_MESSAGE
                )
              );
          }
        })
        .catch(() => {
          logger.error("executing findOne core value");
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
          resConstants.INVALID_CORE_VALUE_CODE,
          resConstants.INVALID_CORE_VALUE_MESSAGE,
          err.errors
        ),
      });
    });
};

//update core value with id
module.exports.update = async (req, res) => {
  let userData = await jwtToken.getData(req.headers["authorization"]);
  const id = req.params.id;
  const org_id = req.params.organisation_id;
  const text = req.body.text;
  const description = req.body.description;
  const thumbnail_url = req.body.thumbnail_url;
  const parent_core_value_id = req.body.parent_core_value_id;
  const schema = validationSchema.updateSchema();

  const coreValue = {
    text: req.body.text,
    description: req.body.description,
    parent_core_value_id: req.body.parent_core_value_id,
    thumbnail_url: req.body.thumbnail_url,
  };

  logger.info("executing update core values");
  logger.info("user id:" + userData.userId);
  logger.info(JSON.stringify(coreValue));
  logger.info("=========================================");
  schema
    .validate(
      { id, org_id, text, description, parent_core_value_id, thumbnail_url },
      { abortEarly: false }
    )
    .then(() => {
      CoreValue.update(coreValue, {
        returning: true,
        where: { id: id, org_id: org_id },
      })
        .then(([rowsUpdate, [updatedCoreValue]]) => {
          if (rowsUpdate == 1) {
            res.status(200).send({
              data: updatedCoreValue,
            });
          } else {
            logger.error("executing update in core value");
            logger.info("user id:" + userData.userId);
            logger.error(resConstants.CORE_VALUE_NOT_FOUND_MESSAGE);
            logger.info("=========================================");
            res
              .status(404)
              .send(
                utility.getErrorResponseObject(
                  resConstants.CORE_VALUE_NOT_FOUND_CODE,
                  resConstants.CORE_VALUE_NOT_FOUND_MESSAGE
                )
              );
          }
        })
        .catch(() => {
          logger.error("executing update in core value");
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
          resConstants.INVALID_CORE_VALUE_CODE,
          resConstants.INVALID_CORE_VALUE_MESSAGE,
          err.errors
        ),
      });
    });
};

module.exports.getCoreValueById = async (req, res) => {
  let userData = await jwtToken.getData(req.headers["authorization"]);
  const id = req.params.id;
  const idSchema = validationSchema.getByIdSchema();
  idSchema
    .validate({ id }, { abortEarly: false })
    .then(() => {
      CoreValue.findOne({
        where: { id: id },
        attributes: [
          "id",
          "description",
          "text",
          "parent_core_value_id",
          "org_id",
          "thumbnail_url",
        ],
      })
        .then((data) => {
          if (data.length != 0) {
            res.status(200).send({
              data: data,
            });
          } else {
            logger.error("executing getCoreValueById");
            logger.info("user id:" + userData.userId);
            logger.error(resConstants.CORE_VALUE_NOT_FOUND_MESSAGE);
            logger.info("=========================================");
            res
              .status(404)
              .send(
                utility.getErrorResponseObject(
                  resConstants.CORE_VALUE_NOT_FOUND_CODE,
                  resConstants.CORE_VALUE_NOT_FOUND_MESSAGE
                )
              );
          }
        })
        .catch(() => {
          logger.error("executing getCoreValueById");
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
          resConstants.INVALID_CORE_VALUE_CODE,
          resConstants.INVALID_CORE_VALUE_MESSAGE,
          err.errors
        ),
      });
    });
};

module.exports.getCoreValues = async (req, res) => {
  let userData = await jwtToken.getData(req.headers["authorization"]);
  CoreValue.findAll({
    attributes: [
      "id",
      "description",
      "text",
      "parent_core_value_id",
      "org_id",
      "thumbnail_url",
    ],
  })
    .then((info) => {
      res.status(200).send({
        data: info,
      });
    })
    .catch(() => {
      logger.error("executing getCoreValues");
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
};
