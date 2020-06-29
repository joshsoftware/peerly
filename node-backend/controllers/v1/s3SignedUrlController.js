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
  const schema = validateSchema.s3SignedUrl();
  let obj = qs.parse(req.query);
  if (obj.type == "profile" || obj.type == "core_value") {
    schema
      .validate(obj, { abortEarly: false })
      .then(async () => {
        const credentials = {
          accessKeyId: process.env.S3_BUCKET_ACCESS_KEY,
          secretAccessKey: process.env.S3_BUCKET_SECRET_KEY,
        };
        AWS.config.update({
          credentials: credentials,
          region: process.env.REGION,
        });
        const s3 = new AWS.S3();
        const presignedURL = await s3.getSignedUrl("putObject", {
          ContentType: process.env.S3_BUCKET_CONTENT_TYPE,
          Bucket: "" + process.env.BUCKET_NAME + "/" + obj.type + "",
          Key: "" + decode.userId + "." + process.env.IMAGE_EXTENSION + "",
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
        logger.info("=========================================");
        res.status(400).send({
          error: utility.getFormattedErrorObj(
            "invalid code",
            "invalid data ",
            err.errors
          ),
        });
      });
  } else {
    logger.error("validation error");
    logger.info("=========================================");
    res.status(400).send({
      error: {
        code: "invalid_data",
        message: "Please provide valid form data",
        fields: {
          fields: "query params must be either profile or core value",
        },
      },
    });
  }
};
