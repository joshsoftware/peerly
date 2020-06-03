const log4js = require("log4js");

const utility = require("../../utils/utility");
const db = require("../../models/sequelize");
const validationSchema = require("./validationSchema/orgValidationSchema");
const Organizations = db.organizations;
require("../../config/loggerConfig");

const logger = log4js.getLogger();

module.exports.create = (req, res) => {
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

  // Validate request
  schema
    .validate(organizations, { abortEarly: false })
    .then(() => {
      // Save Organization in the database
      Organizations.create(organizations)
        .then((info) => {
          logger.info("executing create organisation");
          logger.info(JSON.stringify(info));
          logger.info("=========================================");
          res.status(201).send({
            data: info,
          });
        })
        .catch(() => {
          logger.error("internal server error");
          logger.info("=========================================");
          res.status(500).send({
            error: {
              message: "internal server error",
            },
          });
        });
    })
    .catch((err) => {
      logger.error("validation error");
      logger.error(JSON.stringify(err));
      logger.info("=========================================");
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid organisation",
          "Invalid organisation Data",
          err.errors
        ),
      });
    });
};

module.exports.findAll = (req, res) => {
  Organizations.findAll()
    .then((info) => {
      res.status(200).send({
        data: info,
      });
    })
    .catch(() => {
      logger.error("internal server error");
      logger.info("=========================================");
      res.status(500).send({
        error: {
          message: "internal server error",
        },
      });
    });
};

module.exports.findOne = (req, res) => {
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
            logger.error("Organisation with specified id not found");
            logger.info("=========================================");
            res.status(404).send({
              error: {
                message: "Organisation with specified id not found",
              },
            });
          }
        })
        .catch(() => {
          logger.error("internal server error");
          logger.info("=========================================");
          res.status(500).send({
            error: {
              message: "internal server error",
            },
          });
        });
    })
    .catch((err) => {
      logger.error("validation error");
      logger.error(JSON.stringify(err));
      logger.info("=========================================");
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid orgnisation",
          "Invalid value for parameter id",
          err.errors
        ),
      });
    });
};

module.exports.update = (req, res) => {
  const id = req.params.id;
  const schema = validationSchema.updateSchema();
  const idSchema = validationSchema.getByIdSchema();
  idSchema
    .isValid({
      id: req.params.id,
    })
    .then((valid) => {
      if (!valid) {
        logger.error("invalid orgnisation");
        logger.info("=========================================");
        res.status(400).send({
          error: {
            code: "invalid orgnisation",
            message: "Invalid value for parameter id",
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
        schema
          .validate(organizations, { abortEarly: false })
          .then(() => {
            Organizations.update(organizations, {
              returning: true,
              where: { id: id },
            })
              .then(([rowsUpdate, [updatedCoreValue]]) => {
                if (rowsUpdate == 1) {
                  logger.info("executing update organisation");
                  logger.info("organisation id: " + id);
                  logger.info(JSON.stringify(updatedCoreValue));
                  logger.info("=========================================");
                  res.status(200).send({
                    data: updatedCoreValue,
                  });
                } else {
                  logger.error("Organisation with specified id is not found");
                  logger.info("=========================================");
                  res.status(404).send({
                    error: {
                      message: "Organisation with specified id is not found",
                    },
                  });
                }
              })
              .catch(() => {
                logger.error("internal server error");
                logger.info("=========================================");
                res.status(500).send({
                  error: {
                    message: "internal server error",
                  },
                });
              });
          })
          .catch((err) => {
            logger.error("validation error");
            logger.error(JSON.stringify(err));
            logger.info("=========================================");
            res.status(400).send({
              error: utility.getFormattedErrorObj(
                "invalid orgnisation",
                "Invalid organisation Data",
                err.errors
              ),
            });
          });
      }
    });
};
