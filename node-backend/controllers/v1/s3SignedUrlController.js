var AWS = require("aws-sdk");
const log4js = require("log4js");
const qs = require("qs"); //eslint-disable-line node/no-extraneous-require

const jsonwebtoken = require("../../jwtTokenValidation/jwtValidation");
const utility = require("../../utils/utility");
const validateSchema = require("./validationSchema/s3SignedUrlValidation");
require("../../config/loggerConfig");
const logger = log4js.getLogger();

module.exports.getSignedUrl = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const decode = await jsonwebtoken.getData(authHeader);
  let obj = qs.parse(req.query);

  if (obj.type == "profile" || obj.type == "core_value") {
    const credentials = {
      accessKeyId: process.env.S3_BUCKET_ACCESS_KEY,
      secretAccessKey: process.env.S3_BUCKET_SECRET_KEY,
    };
    AWS.config.update({
      credentials: credentials,
      region: process.env.REGION,
    });
    const s3 = new AWS.S3();
    let presignedURL;
    if (obj.type == "profile") {
      presignedURL = await s3.getSignedUrl("putObject", {
        Bucket: "" + process.env.BUCKET_NAME + "/profile",
        Key: "" + decode.userId + "",
        Expires: parseInt(process.env.S3_OBJECT_EXPIRE_TIME),
      });
      res.status(200).send({
        data: {
          s3_signed_url: presignedURL,
        },
      });
    } else {
      const coreValueValidation = validateSchema.coreValueFileType();
      const coreValueObject = {
        core_value_id: obj.core_value_id,
      };
      coreValueValidation
        .validate(coreValueObject, { abortEarly: false })
        .then(async () => {
          presignedURL = await s3.getSignedUrl("putObject", {
            Bucket: "" + process.env.BUCKET_NAME + "/core_values",
            Key: "" + obj.core_value_id + "",
            Expires: parseInt(process.env.S3_OBJECT_EXPIRE_TIME),
          });
          res.status(200).send({
            data: {
              s3_signed_url: presignedURL,
            },
          });
        })
        .catch((err) => {
          logger.error("validation error");
          logger.error(JSON.stringify(err));
          logger.error("=========================================");
          res.status(400).send({
            error: utility.getFormattedErrorObj(
              "invalid code",
              "invalid data ",
              err.errors
            ),
          });
        });
    }
  } else {
    logger.error("validation error");
    logger.info("=========================================");
    res.status(400).send({
      error: {
        code: "invalid_data",
        message: "should be please provide valid data for file upload",
        fields: {
          fields: "query params must be either profile or core value",
        },
      },
    });
  }
};
