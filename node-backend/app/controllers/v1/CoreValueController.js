const log4js = require("log4js");

const utility = require("../../utils/utility");
const db = require("../../models/sequelize");
const validationSchema = require("./validationSchema/coreValueValidationSchema");
require("../../config/loggerConfig");

const CoreValue = db.core_value;
const logger = log4js.getLogger();

module.exports.create = (req, res) => {
  //validation schema
  const schema = validationSchema.insertSchema();
  // Create a core value object
  const coreValue = {
    org_id: req.params.organisation_id,
    text: req.body.text,
    description: req.body.description,
    parent_core_value_id: req.body.parent_core_value_id,
  };

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
        .catch((err) => {
          logger.error(err);
          res.status(500).send({
            error: {
              message: "internal server error",
            },
          });
        });
    })
    .catch((err) => {
      logger.error(err);
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid-core-value",
          "Invalid core value data",
          err.errors
        ),
      });
    });
};
//get all core values
module.exports.findAll = (req, res) => {
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
        .catch((err) => {
          logger.error(err);
          res.status(500).send({
            error: {
              message: "internal server error",
            },
          });
        });
    })
    .catch((err) => {
      logger.error(err);
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid-core-value",
          "Invalid core value data",
          err.errors
        ),
      });
    });
};

//get core value with id
module.exports.findOne = (req, res) => {
  const id = req.params.id;
  const org_id = req.params.organisation_id;
  const idSchema = validationSchema.findOneSchema();
  idSchema
    .validate({ id, org_id }, { abortEarly: false })
    .then(() => {
      CoreValue.findAll({ where: { org_id: org_id, id: id } })
        .then((data) => {
          if (data.length != 0) {
            res.status(200).send({
              data: data,
            });
          } else {
            res.status(404).send({
              error: {
                message: "core value not found for specified id ",
              },
            });
          }
        })
        .catch((err) => {
          logger.error(err);
          res.status(500).send({
            error: {
              message: "internal server error",
            },
          });
        });
    })
    .catch((err) => {
      logger.error(err);
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid-core-value",
          "Invalid core value data",
          err.errors
        ),
      });
    });
};

//update core value with id
module.exports.update = (req, res) => {
  const id = req.params.id;
  const org_id = req.params.organisation_id;
  const text = req.body.text;
  const description = req.body.description;
  const parent_core_value_id = req.body.parent_core_value_id;
  const schema = validationSchema.updateSchema();
  const coreValue = {
    text: req.body.text,
    description: req.body.description,
    parent_core_value_id: req.body.parent_core_value_id,
  };
  schema
    .validate(
      { id, org_id, text, description, parent_core_value_id },
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
            res.status(404).send({
              error: {
                message: "core value not found for specified id",
              },
            });
          }
        })
        .catch((err) => {
          logger.error(err);
          res.status(500).send({
            error: {
              message: "internal server error",
            },
          });
        });
    })
    .catch((err) => {
      logger.error(err);
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid-core-value",
          "Invalid core value data",
          err.errors
        ),
      });
    });
};

module.exports.getCoreValueById = (req, res) => {
  const id = req.params.id;
  const idSchema = validationSchema.getByIdSchema();
  idSchema
    .validate({ id }, { abortEarly: false })
    .then(() => {
      CoreValue.findAll({
        where: { id: id },
        attributes: [
          "id",
          "description",
          "text",
          "parent_core_value_id",
          "org_id",
        ],
      })
        .then((data) => {
          if (data.length != 0) {
            res.status(200).send({
              data: data,
            });
          } else {
            res.status(404).send({
              error: {
                message: "core value not found for specified id ",
              },
            });
          }
        })
        .catch((err) => {
          logger.error(err);
          res.status(500).send({
            error: {
              message: "internal server error",
            },
          });
        });
    })
    .catch((err) => {
      logger.error(err);
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid-core-value",
          "Invalid core value data",
          err.errors
        ),
      });
    });
};

module.exports.getCoreValues = (req, res) => {
  CoreValue.findAll({
    attributes: ["id", "description", "text", "parent_core_value_id", "org_id"],
  })
    .then((info) => {
      res.status(200).send({
        data: info,
      });
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send({
        error: {
          message: "internal server error",
        },
      });
    });
};
