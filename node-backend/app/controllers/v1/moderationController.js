const moment = require("moment"); //eslint-disable-line node/no-extraneous-require
const log4js = require("log4js");

const db = require("../../models/sequelize");
const jwtValidate = require("../../jwtTokenValidation/jwtValidation");
const utility = require("../../utils/utility");
const validationSchema = require("./validationSchema/moderationSchema");
const resConstants = require("../../constant/responseConstants");
require("../../config/loggerConfig");

const logger = log4js.getLogger();
const RecognitionModeration = db.recognition_moderation;
const ReportedRecognitions = db.reported_recognitions;

module.exports.report = async (req, res) => {
  const schema = validationSchema.reportSchema();
  const tokenData = await jwtValidate.getData(req.headers["authorization"]);
  const reportedRecognition = {
    recognition_id: req.params.recognition_id,
    type_of_reporting: req.body.mark_as,
    reason_for_reporting: req.body.reason,
    reported_by: tokenData.userId,
    reported_at: moment.utc().unix(),
  };
  logger.info("executing report in moderation");
  logger.info("reported by: " + tokenData.userId);
  logger.info(JSON.stringify(reportedRecognition));
  logger.info("=========================================");
  // Validate request
  schema
    .validate(reportedRecognition, { abortEarly: false })
    .then(() => {
      ReportedRecognitions.create(reportedRecognition)
        .then((data) => {
          res.status(201).send({
            data: data,
          });
        })
        .catch(() => {
          logger.error("executing report in moderation");
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
          resConstants.INVALID_REPORTED_RECOGNITION_CODE,
          resConstants.INVALID_REPORTED_RECOGNITION_MESSAGE,
          err.errors
        ),
      });
    });
};

module.exports.review = async (req, res) => {
  const schema = validationSchema.reviewSchema();
  const tokenData = await jwtValidate.getData(req.headers["authorization"]);
  const recognitionModeration = {
    recognition_id: req.params.recognition_id,
    is_inappropriate: req.body.is_inappropriate,
    moderator_comment: req.body.comment,
    moderated_by: tokenData.userId,
    moderated_at: moment.utc().unix(),
  };
  logger.info("executing review moderation");
  logger.info("moderated by: " + tokenData.userId);
  logger.info(JSON.stringify(recognitionModeration));
  logger.info("=========================================");
  // Validate request
  schema
    .validate(recognitionModeration, { abortEarly: false })
    .then(() => {
      RecognitionModeration.create(recognitionModeration)
        .then((data) => {
          res.status(201).send({
            data: data,
          });
        })
        .catch(() => {
          logger.error("executing review moderation");
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
          resConstants.INVALID_REPORTED_RECOGNITION_CODE,
          resConstants.INVALID_REPORTED_RECOGNITION_MESSAGE,
          err.errors
        ),
      });
    });
};
