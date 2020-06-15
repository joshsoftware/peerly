const moment = require("moment"); //eslint-disable-line node/no-extraneous-require
const qs = require("qs"); //eslint-disable-line node/no-extraneous-require
const log4js = require("log4js");

const db = require("../../models/sequelize");
const jwtValidate = require("../../jwtTokenValidation/jwtValidation");
const utility = require("../../utils/utility");
const constant = require("../../constant/resConstants");
const validationSchema = require("./validationSchema/recognitionValidationSchema");
require("../../config/loggerConfig");

const logger = log4js.getLogger();
const Recognitions = db.recognitions;
const CoreValues = db.core_values;
const Users = db.users;
const RecognitionHi5 = db.recognition_hi5;

const validateCoreValue = async (req, res, tokenData) => {
  return CoreValues.findByPk(req.body.core_value_id, {
    attributes: ["org_id"],
  })
    .then((data) => {
      if (data === null) {
        logger.error("Error executing validate core value");
        logger.info("user id: " + tokenData.userId);
        logger.error(constant.CORE_VALUE_NOT_FOUND_MESSAGE);
        logger.info("=========================================");
        res
          .status(404)
          .send(
            utility.getErrorResponseObject(
              constant.CORE_VALUE_NOT_FOUND_CODE,
              constant.CORE_VALUE_NOT_FOUND_MESSAGE
            )
          );
      } else if (data.dataValues.org_id == tokenData.orgId) {
        // CoreValue validate successfully
        return true;
      } else {
        logger.error("Error executing validate core value");
        logger.info("user id: " + tokenData.userId);
        logger.error(constant.CORE_VALUE_NOT_FOUND_IN_ORGANISATION_MESSAGE);
        logger.info("=========================================");
        res
          .status(404)
          .send(
            utility.getErrorResponseObject(
              constant.CORE_VALUE_NOT_FOUND_CODE,
              constant.CORE_VALUE_NOT_FOUND_IN_ORGANISATION_MESSAGE
            )
          );
      }
    })
    .catch(() => {
      logger.error("Error executing validate core value");
      logger.info("user id: " + tokenData.userId);
      logger.error(constant.INTRENAL_SERVER_ERROR_MESSAGE);
      logger.info("=========================================");
      res
        .status(500)
        .send(
          utility.getErrorResponseObject(
            constant.INTRENAL_SERVER_ERROR_CODE,
            constant.INTRENAL_SERVER_ERROR_MESSAGE
          )
        );
    });
};

const validateGivenFor = async (req, res, tokenData) => {
  return Users.findByPk(req.body.given_for, { attributes: ["org_id"] })
    .then((data) => {
      if (data === null) {
        logger.error("Error executing validate given for");
        logger.info("user id: " + tokenData.userId);
        logger.error(constant.USER_NOT_FOUND_MESSAGE);
        logger.info("=========================================");
        res
          .status(404)
          .send(
            utility.getErrorResponseObject(
              constant.USER_NOT_FOUND_CODE,
              constant.USER_NOT_FOUND_MESSAGE
            )
          );
      } else if (data.dataValues.org_id == tokenData.orgId) {
        return true;
      } else {
        logger.error("Error executing validate given for");
        logger.info("user id: " + tokenData.userId);
        logger.error(constant.USER_NOT_FOUND_IN_ORGANISATION_MESSAGE);
        logger.info("=========================================");
        res
          .status(404)
          .send(
            utility.getErrorResponseObject(
              constant.USER_NOT_FOUND_CODE,
              constant.USER_NOT_FOUND_IN_ORGANISATION_MESSAGE
            )
          );
      }
    })
    .catch(() => {
      logger.error("Error executing validate given for");
      logger.info("user id: " + tokenData.userId);
      logger.error(constant.INTRENAL_SERVER_ERROR_MESSAGE);
      logger.info("=========================================");
      res
        .status(500)
        .send(
          utility.getErrorResponseObject(
            constant.INTRENAL_SERVER_ERROR_CODE,
            constant.INTRENAL_SERVER_ERROR_MESSAGE
          )
        );
    });
};

const addRecognition = async (req, res, recognitions) => {
  const tokenData = await jwtValidate.getData(req.headers["authorization"]);
  logger.info("Error executing create recognition");
  logger.info("user id: " + tokenData.userId);
  logger.info(JSON.stringify(recognitions));
  logger.info("=========================================");
  Recognitions.create(recognitions)
    .then((info) => {
      res.status(201).send({
        data: info,
      });
    })
    .catch(() => {
      logger.error("Error executing create recognition");
      logger.info("user id: " + tokenData.userId);
      logger.error(constant.INTRENAL_SERVER_ERROR_MESSAGE);
      logger.info("=========================================");
      res
        .status(500)
        .send(
          utility.getErrorResponseObject(
            constant.INTRENAL_SERVER_ERROR_CODE,
            constant.INTRENAL_SERVER_ERROR_MESSAGE
          )
        );
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
    .then(async () => {
      if (await validateCoreValue(req, res, tokenData)) {
        if (await validateGivenFor(req, res, tokenData)) {
          await addRecognition(req, res, recognitions);
        }
      }
    })
    .catch((err) => {
      logger.error("validation error");
      logger.error(JSON.stringify(err));
      logger.info("=========================================");
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          constant.INVALID_RECOGNITION_CODE,
          constant.INVALID_RECOGNITION_MESSAGE,
          err.errors
        ),
      });
    });
};

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
          },
        ],
      })
        .then((data) => {
          if (data == null /*eslint-disable-line no-eq-null*/) {
            logger.error("Error executing find one in recognition");
            logger.info("user id: " + userData.userId);
            logger.error(constant.RECOGNITION_NOT_FOUND_MESSAGE);
            logger.info("=========================================");
            res
              .status(404)
              .send(
                utility.getErrorResponseObject(
                  constant.RECOGNITION_NOT_FOUND_CODE,
                  constant.RECOGNITION_NOT_FOUND_MESSAGE
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
          logger.error(constant.INTRENAL_SERVER_ERROR_MESSAGE);
          logger.info("=========================================");
          res
            .status(500)
            .send(
              utility.getErrorResponseObject(
                constant.INTRENAL_SERVER_ERROR_CODE,
                constant.INTRENAL_SERVER_ERROR_MESSAGE
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
          constant.INVALID_RECOGNITION_CODE,
          constant.INVALID_RECOGNITION_MESSAGE,
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
            where: createWhereClause(tokenData, filterData.core_value_id),
          },
        ],
        offset: paginationData.offset,
        limit: paginationData.limit,
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
              constant.RECOGNITION_NOT_FOUND_IN_ORGANISATION_MESSAGE
            );
            logger.info("=========================================");
            res
              .status(404)
              .send(
                utility.getErrorResponseObject(
                  constant.RECOGNITION_NOT_FOUND_CODE,
                  constant.RECOGNITION_NOT_FOUND_IN_ORGANISATION_MESSAGE
                )
              );
          }
        })
        .catch(() => {
          logger.error("Error executing find all in recognition");
          logger.info("user id: " + tokenData.userId);
          logger.error(constant.INTRENAL_SERVER_ERROR_MESSAGE);
          logger.info("=========================================");
          res
            .status(500)
            .send(
              utility.getErrorResponseObject(
                constant.INTRENAL_SERVER_ERROR_CODE,
                constant.INTRENAL_SERVER_ERROR_MESSAGE
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
          constant.INVALID_RECOGNITION_CODE,
          constant.INVALID_RECOGNITION_MESSAGE,
          err.errors
        ),
      });
    });
};

const getHi5Count = async (req, res, id, orgId) => {
  const userData = await jwtValidate.getData(req.headers["authorization"]);
  return Users.findByPk(id, { attributes: ["hi5_quota_balance", "org_id"] })
    .then((data) => {
      if (data === null) {
        logger.error("Error executing getHi5Count");
        logger.info("user id: " + userData.userId);
        logger.error(constant.USER_NOT_FOUND_MESSAGE);
        logger.info("=========================================");
        res
          .status(404)
          .send(
            utility.getErrorResponseObject(
              constant.USER_NOT_FOUND_CODE,
              constant.USER_NOT_FOUND_MESSAGE
            )
          );
      } else if (data.dataValues.org_id !== orgId) {
        logger.error("Error executing getHi5Count");
        logger.info("user id: " + userData.userId);
        logger.error(constant.USER_NOT_FOUND_IN_ORGANISATION_MESSAGE);
        logger.info("=========================================");
        res
          .status(404)
          .send(
            utility.getErrorResponseObject(
              constant.USER_NOT_FOUND_CODE,
              constant.USER_NOT_FOUND_IN_ORGANISATION_MESSAGE
            )
          );
      } else if (data.dataValues.hi5_quota_balance > 0) {
        return data.dataValues.hi5_quota_balance;
      } else {
        logger.error("Error executing getHi5Count");
        logger.info("user id: " + userData.userId);
        logger.error(constant.EMPTY_HI5_BALANCE_MESSAGE);
        logger.info("=========================================");
        res
          .status(404)
          .send(
            utility.getErrorResponseObject(
              constant.EMPTY_HI5_BALANCE_CODE,
              constant.EMPTY_HI5_BALANCE_MESSAGE
            )
          );
      }
    })
    .catch(() => {
      logger.error("Error executing getHi5Count");
      logger.info("user id: " + userData.userId);
      logger.error(constant.INTRENAL_SERVER_ERROR_MESSAGE);
      logger.info("=========================================");
      res
        .status(500)
        .send(
          utility.getErrorResponseObject(
            constant.INTRENAL_SERVER_ERROR_CODE,
            constant.INTRENAL_SERVER_ERROR_MESSAGE
          )
        );
    });
};

const getHi5Data = (data, recognition_id, given_by) => {
  let hi5Data = {
    recognition_id: recognition_id,
    given_by: given_by,
    given_at: moment.utc().unix(),
    comment: data.comment || null,
  };
  return hi5Data;
};

const validateRecognition = async (req, res, id) => {
  const userData = await jwtValidate.getData(req.headers["authorization"]);
  return Recognitions.findByPk(id)
    .then(async (data) => {
      if (data == null /*eslint-disable-line no-eq-null*/) {
        logger.error("Error executing validateRecognition");
        logger.info("user id: " + userData.userId);
        logger.error(constant.RECOGNITION_NOT_FOUND_MESSAGE);
        logger.info("=========================================");
        res
          .status(404)
          .send(
            utility.getErrorResponseObject(
              constant.RECOGNITION_NOT_FOUND_CODE,
              constant.RECOGNITION_NOT_FOUND_MESSAGE
            )
          );
      } else {
        return true;
      }
    })
    .catch(() => {
      logger.error("Error executing validateRecognition");
      logger.info("user id: " + userData.userId);
      logger.error(constant.INTRENAL_SERVER_ERROR_MESSAGE);
      logger.info("=========================================");
      res
        .status(500)
        .send(
          utility.getErrorResponseObject(
            constant.INTRENAL_SERVER_ERROR_CODE,
            constant.INTRENAL_SERVER_ERROR_MESSAGE
          )
        );
    });
};

const decrementHi5Count = async (req, res, id, orgId) => {
  const userData = await jwtValidate.getData(req.headers["authorization"]);
  let hi5Count = (await getHi5Count(res, res, id, orgId)) - 1;
  logger.info("executing decrerment hi5 count");
  logger.info("user id: " + userData.userId);
  logger.info("his count: " + hi5Count);
  logger.info("=========================================");

  return Users.update(
    { hi5_quota_balance: hi5Count },
    {
      returning: true,
      where: { id: id },
    }
  )
    .then(([rowsUpdate]) => {
      if (rowsUpdate == 1) {
        return true;
      } else {
        logger.error("Error executing decrerment hi5 count");
        logger.info("user id: " + userData.userId);
        logger.error(constant.USER_NOT_FOUND_MESSAGE);
        logger.info("=========================================");
        res
          .status(404)
          .send(
            utility.getErrorResponseObject(
              constant.USER_NOT_FOUND_CODE,
              constant.USER_NOT_FOUND_MESSAGE
            )
          );
      }
    })
    .catch(() => {
      logger.error("Error executing decrerment hi5 count");
      logger.info("user id: " + userData.userId);
      logger.error(constant.INTRENAL_SERVER_ERROR_MESSAGE);
      logger.info("=========================================");
      res
        .status(500)
        .send(
          utility.getErrorResponseObject(
            constant.INTRENAL_SERVER_ERROR_CODE,
            constant.INTRENAL_SERVER_ERROR_MESSAGE
          )
        );
    });
};

const addHi5Entry = async (req, res, data, orgId) => {
  const userData = await jwtValidate.getData(req.headers["authorization"]);
  logger.info("executing addHi5Entry");
  logger.info("user id: " + userData.userId);
  logger.info(JSON.stringify(data));
  logger.info("=========================================");

  RecognitionHi5.create(data)
    .then(async () => {
      if (await decrementHi5Count(req, res, data.given_by, orgId)) {
        res.status(201).send({
          data: data,
        });
      }
    })
    .catch(() => {
      logger.error("Error executing find users by organisation");
      logger.info("user id: " + userData.userId);
      logger.error(constant.INTRENAL_SERVER_ERROR_MESSAGE);
      logger.info("=========================================");
      res
        .status(500)
        .send(
          utility.getErrorResponseObject(
            constant.INTRENAL_SERVER_ERROR_CODE,
            constant.INTRENAL_SERVER_ERROR_MESSAGE
          )
        );
    });
};

module.exports.giveHi5 = async (req, res) => {
  const tokenData = await jwtValidate.getData(req.headers["authorization"]);
  const idSchema = validationSchema.getByIdSchema();
  const schema = validationSchema.insertHi5Schema();
  const hi5Data = getHi5Data(
    req.body,
    req.params.recognition_id,
    tokenData.userId
  );

  idSchema
    .validate({ id: req.params.recognition_id }, { abortEarly: false })
    .then(() => {
      schema
        .validate(hi5Data, { abortEarly: false })
        .then(async () => {
          if (await validateRecognition(req, res, hi5Data.recognition_id)) {
            if (
              await getHi5Count(req, res, hi5Data.given_by, tokenData.orgId)
            ) {
              await addHi5Entry(req, res, hi5Data, tokenData.orgId);
            }
          }
        })
        .catch((err) => {
          logger.error("validation error");
          logger.error(JSON.stringify(err));
          logger.info("=========================================");
          res.status(400).send({
            error: utility.getFormattedErrorObj(
              constant.INVALID_RECOGNITION_CODE,
              constant.INVALID_RECOGNITION_MESSAGE,
              err.errors
            ),
          });
        });
    })
    .catch((err) => {
      logger.error("validation error");
      logger.error(JSON.stringify(err));
      logger.info("=========================================");
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          constant.INVALID_RECOGNITION_CODE,
          constant.INVALID_RECOGNITION_MESSAGE,
          err.errors
        ),
      });
    });
};
