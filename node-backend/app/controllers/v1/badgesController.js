const log4js = require("log4js");

const utility = require("../../utils/utility");
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

  schema
    .validate(badges, { abortEarly: false })
    .then(() => {
      // Save badges in the database
      Badges.create(badges)
        .then((data) => {
          logger.info("executing create badges");
          logger.info("user id:" + userData.userId);
          logger.info(JSON.stringify(data));
          logger.info("=========================================");
          res.status(201).send({
            data: data,
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
          "invalid-badges",
          "Invalid badges data",
          err.errors
        ),
      });
    });
};
//get all badges
module.exports.findAll = (req, res) => {
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
          "invalid-badges",
          "Invalid badges data",
          err.errors
        ),
      });
    });
};

//get badges with id
module.exports.findOne = (req, res) => {
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
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid-badges",
          "Invalid badges data",
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
            logger.info("executing update badges");
            logger.info("user id:" + userData.userId);
            logger.info(JSON.stringify(updatedBadges));
            logger.info("=========================================");
            res.status(200).send({
              data: updatedBadges,
            });
          } else {
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
          "invalid-badges",
          "Invalid badges data",
          err.errors
        ),
      });
    });
};
