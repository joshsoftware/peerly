const moment = require("moment"); //eslint-disable-line node/no-extraneous-require
const qs = require("qs"); //eslint-disable-line node/no-extraneous-require
const log4js = require("log4js");

const db = require("../../models/sequelize");
const jwtValidate = require("../../jwtTokenValidation/jwtValidation");
const utility = require("../../utils/utility");
const resConstants = require("../../constant/responseConstants");
const validationSchema = require("./validationSchema/recognitionValidationSchema");
require("../../config/loggerConfig");

const logger = log4js.getLogger();
const Recognitions = db.recognitions;
const RecognitionHi5 = db.recognition_hi5;

module.exports.findOne = async (req, res) => {
  const userData = await jwtValidate.getData(req.headers["authorization"]);
  const idSchema = validationSchema.getByIdSchema();
  idSchema
    .validate({ id: req.params.id }, { abortEarly: false })
    .then(() => {
      Recognitions.findByPk(req.params.id, {
        attributes: ["id", "text", "given_at"],
        include: [
          {
            model: db.users,
            attributes: ["id", "first_name", "last_name", "profile_image_url"],
            as: "given_for_user",
          },
          {
            model: db.users,
            attributes: ["id", "first_name", "last_name", "profile_image_url"],
            as: "given_by_user",
          },
          {
            model: db.core_values,
            attributes: ["id", "text", "description", "thumbnail_url"],
            as: "coreValue",
          },
          {
            model: db.recognition_hi5,
            attributes: ["id"],
            include: [
              {
                attributes: [
                  "id",
                  "first_name",
                  "last_name",
                  "profile_image_url",
                ],
                model: db.users,
                as: "given_by_user",
              },
            ],
          },
        ],
      })
        .then((data) => {
          if (data == null /*eslint-disable-line no-eq-null*/) {
            logger.error("Error executing find one in recognition");
            logger.info("user id: " + userData.userId);
            logger.error(resConstants.RECOGNITION_NOT_FOUND_MESSAGE);
            logger.info("=========================================");
            res
              .status(404)
              .send(
                utility.getErrorResponseObject(
                  resConstants.RECOGNITION_NOT_FOUND_CODE,
                  resConstants.RECOGNITION_NOT_FOUND_MESSAGE
                )
              );
          } else {
            res.status(200).send({
              data: data,
            });
          }
        })
        .catch(() => {
          logger.error("Error executing find one in recognition");
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
          resConstants.INVALID_RECOGNITION_CODE,
          resConstants.INVALID_RECOGNITION_MESSAGE,
          err.errors
        ),
      });
    });
};

const getFilterData = (data) => {
  let filterData = {
    core_value_id: data.core_value_id,
    given_for: data.given_for,
    given_by: data.given_by,
    limit: data.limit || null,
    offset: data.offset || null,
  };
  return filterData;
};

const createWhereClause = ({ orgId }, filterId) => {
  if (filterId) {
    return {
      org_id: orgId,
      id: filterId,
    };
  } else {
    return {
      org_id: orgId,
    };
  }
};

module.exports.findAll = async (req, res) => {
  const tokenData = await jwtValidate.getData(req.headers["authorization"]);
  const filterSchema = validationSchema.getFilterSchema();
  const filterData = getFilterData(qs.parse(req.query));
  const paginationData = utility.getLimitAndOffset(filterData);

  filterSchema
    .validate(filterData, { abortEarly: false })
    .then(() => {
      Recognitions.findAll({
        attributes: ["id", "text"],
        include: [
          {
            model: db.users,
            attributes: ["id", "first_name", "last_name", "profile_image_url"],
            as: "given_for_user",
            where: createWhereClause(tokenData, filterData.given_for),
          },
          {
            model: db.users,
            attributes: ["id", "first_name", "last_name", "profile_image_url"],
            as: "given_by_user",
            where: createWhereClause(tokenData, filterData.given_by),
          },
          {
            model: db.core_values,
            attributes: ["id", "text", "description", "thumbnail_url"],
            as: "coreValue",
            where: createWhereClause(tokenData, filterData.core_value_id),
          },
          {
            model: db.recognition_hi5,
            attributes: ["id"],
            include: [
              {
                attributes: [
                  "id",
                  "first_name",
                  "last_name",
                  "profile_image_url",
                ],
                model: db.users,
                as: "given_by_user",
              },
            ],
          },
        ],
        offset: paginationData.offset,
        limit: paginationData.limit,
        order: [["id", "DESC"]],
      })
        .then((info) => {
          let data = info[0];
          if (data != undefined) {
            res.status(200).send({
              data: info,
            });
          } else {
            logger.error("Error executing getHi5Count");
            logger.info("user id: " + tokenData.userId);
            logger.error(
              resConstants.RECOGNITION_NOT_FOUND_IN_ORGANISATION_MESSAGE
            );
            logger.info("=========================================");
            res
              .status(404)
              .send(
                utility.getErrorResponseObject(
                  resConstants.RECOGNITION_NOT_FOUND_CODE,
                  resConstants.RECOGNITION_NOT_FOUND_IN_ORGANISATION_MESSAGE
                )
              );
          }
        })
        .catch(() => {
          logger.error("Error executing find all in recognition");
          logger.info("user id: " + tokenData.userId);
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
          resConstants.INVALID_RECOGNITION_CODE,
          resConstants.INVALID_RECOGNITION_MESSAGE,
          err.errors
        ),
      });
    });
};

module.exports.create = async (req, res) => {
  const schema = validationSchema.insertSchema();
  const tokenData = await jwtValidate.getData(req.headers["authorization"]);
  // Create a Recognition
  const recognitions = {
    core_value_id: req.body.core_value_id,
    text: req.body.text,
    given_for: req.body.given_for,
    given_by: tokenData.userId,
    given_at: moment.utc().unix(),
  };
  // Validate request
  schema
    .validate(recognitions, { abortEarly: false })
    .then(() => {
      Recognitions.create(recognitions)
        .then((info) => {
          res.status(201).send({
            data: info,
          });
        })
        .catch((err) => {
          logger.error("Error executing creat in recognition");
          logger.error("user id: " + tokenData.userId);
          logger.error("=========================================");
          if (err.status == 422) {
            res
              .status(422)
              .send(
                utility.getErrorResponseObject(
                  resConstants.EMPTY_HI5_BALANCE_CODE,
                  resConstants.EMPTY_HI5_BALANCE_MESSAGE
                )
              );
          } else {
            res
              .status(500)
              .send(
                utility.getErrorResponseObject(
                  resConstants.INTRENAL_SERVER_ERROR_CODE,
                  resConstants.INTRENAL_SERVER_ERROR_MESSAGE
                )
              );
          }
        });
    })
    .catch((err) => {
      logger.error("validation error");
      logger.error(JSON.stringify(err));
      logger.info("=========================================");
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          resConstants.INVALID_RECOGNITION_CODE,
          resConstants.INVALID_RECOGNITION_MESSAGE,
          err.errors
        ),
      });
    });
};

module.exports.giveHi5 = async (req, res) => {
  const tokenData = await jwtValidate.getData(req.headers["authorization"]);
  const hi5Schema = validationSchema.insertHi5Schema();
  let hi5Data = {
    recognition_id: req.params.recognition_id,
    given_by: tokenData.userId,
    given_at: moment.utc().unix(),
    comment: req.body.comment || null,
  };
  hi5Schema
    .validate(hi5Data, { abortEarly: false })
    .then(() => {
      RecognitionHi5.create(hi5Data)
        .then((data) => {
          res.status(201).send({
            data: data,
          });
        })
        .catch((err) => {
          logger.error("Error executing give hi5 in recognition");
          logger.error("user id: " + tokenData.userId);
          logger.error("=========================================");
          if (err.status == 422) {
            res
              .status(422)
              .send(
                utility.getErrorResponseObject(
                  resConstants.UNPROCESSABLE_ENTITY_CODE,
                  err.message
                )
              );
          } else if (err.status == 404) {
            res
              .status(404)
              .send(
                utility.getErrorResponseObject(
                  resConstants.RECOGNITION_NOT_FOUND_CODE,
                  err.message
                )
              );
          } else {
            res
              .status(500)
              .send(
                utility.getErrorResponseObject(
                  resConstants.INTRENAL_SERVER_ERROR_CODE,
                  resConstants.INTRENAL_SERVER_ERROR_MESSAGE
                )
              );
          }
        });
    })
    .catch((err) => {
      logger.error("validation error");
      logger.error(JSON.stringify(err));
      logger.info("=========================================");
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          resConstants.INVALID_RECOGNITION_CODE,
          resConstants.INVALID_RECOGNITION_MESSAGE,
          err.errors
        ),
      });
    });
};
