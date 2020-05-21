const moment = require("moment"); //eslint-disable-line node/no-extraneous-require

const db = require("../../models/sequelize");
const jwtValidate = require("../../jwtTokenValidation/jwtValidation");
const utility = require("../../utils/utility");
const validationSchema = require("./validationSchema/moderationSchema");
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
          res.status(500).send({
            error: {
              message: "internal server error",
            },
          });
        });
    })
    .catch((err) => {
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid reported recognition",
          "invalid reported recognition Data",
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
          res.status(500).send({
            error: {
              message: "internal server error",
            },
          });
        });
    })
    .catch((err) => {
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid recognition moderation",
          "invalid recognition moderation Data",
          err.errors
        ),
      });
    });
};
