const yup = require("yup");

const db = require("../models/sequelize");
const CoreValue = db.core_value;

module.exports.create = (req, res) => {
  //validation schema
  const schema = yup.object().shape({
    org_id: yup
      .number({ org_id: "Id should be number" })
      .required({ org_id: "organisation id required" }),
    core_value_text: yup
      .string()
      .required({ core_value_text: "core value text required" }),
    description: yup
      .string()
      .required({ description: "description is required" }),
    parent_core_value_id: yup
      .number({ parent_core_value_id: "Id should be number" })
      .required({ parent_core_value_id: "parent core value id required" }),
  });
  // Create a core value object
  const coreValue = {
    org_id: req.params.organisation_id,
    core_value_text: req.body.core_value_text,
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
        error: {
          message: err.errors,
        },
      });
    });
};
//get all core values
module.exports.findAll = (req, res) => {
  const org_id = req.params.organisation_id;
  const idSchema = yup.object().shape({
    org_id: yup
      .number({ org_id: " organisation id should be number" })
      .required({ org_id: "organisation id required" }),
  });
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
          res.status(500).send({
            error: {
              message: "internal server error",
            },
          });
        });
    })
    .catch((err) => {
      res.status(400).send({
        error: {
          message: err.errors,
        },
      });
    });
};

//get core value with id
module.exports.findOne = (req, res) => {
  const id = req.params.id;
  const org_id = req.params.organisation_id;
  const idSchema = yup.object().shape({
    id: yup
      .number({ id: "Id should be number" })
      .required({ id: "id is required" }),
    org_id: yup
      .number({ org_id: "organisation id should be number" })
      .required({ org_id: "organisation id required" }),
  });
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
        error: {
          message: err.errors,
        },
      });
    });
};

//update core value with id
module.exports.update = (req, res) => {
  const id = req.params.id;
  const org_id = req.params.organisation_id;
  const core_value_text = req.body.core_value_text;
  const description = req.body.description;
  const parent_core_value_id = req.body.parent_core_value_id;
  const schema = yup.object().shape({
    id: yup
      .number({ id: "Id should be number" })
      .required({ id: "id required" }),
    org_id: yup
      .number({ org_id: "organisation id should be number" })
      .required({ org_id: "organisation id required" }),
    core_value_text: yup.string(),
    description: yup.string(),
    parent_core_value_id: yup.number({
      parent_core_value_id: "parent_core_value_id should be number",
    }),
  });
  const coreValue = {
    core_value_text: req.body.core_value_text,
    description: req.body.description,
    parent_core_value_id: req.body.parent_core_value_id,
  };
  schema
    .validate(
      { id, org_id, core_value_text, description, parent_core_value_id },
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
        error: {
          message: err.errors,
        },
      });
    });
};
