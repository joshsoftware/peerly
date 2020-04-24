const db = require("../models/sequelize");
const CoreValue = db.core_value;
const yup = require("yup");

module.exports.create = (req, res) => {
  //validation schema
  const schema = yup.object().shape({
    org_id: yup.number().required(),
    core_value_text: yup.string().required(),
    description: yup.string().required(),
    parent_core_value_id: yup.number().required(),
  });
  // Create a core value object
  const corevalue = {
    org_id: req.params.organisation_id,
    core_value_text: req.body.core_value_text,
    description: req.body.description,
    parent_core_value_id: req.body.parent_core_value_id,
  };

  schema.isValid(corevalue).then(function (valid) {
    if (valid) {
      // Save corevalue in the database
      CoreValue.create(corevalue)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the Organization.",
          });
        });
    } else {
      res.send({
        status: 422,
        message: "Contents not be correct format",
      });
    }
  });
};
//get all core values
module.exports.findAll = (req, res) => {
  CoreValue.findAll({ where: { org_id: req.params.organisation_id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

//get core value with id
module.exports.findOne = (req, res) => {
  const id = req.params.id;
  const org_id = req.params.organisation_id;
  const idSchema = yup.object().shape({
    id: yup.number().required(),
    org_id: yup.number().required(),
  });
  idSchema
    .isValid({
      id,
      org_id,
    })
    .then((valid) => {
      if (valid) {
        CoreValue.findAll({ where: { org_id: org_id, id: id } })
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err + "Error retrieving Tutorial with id=" + req.params.id,
            });
          });
      } else {
        res.send({
          status: 422,
          message: "Contents not be in correct format ",
        });
      }
    });
};

//update core value with id
module.exports.update = (req, res) => {
  const id = req.params.id;
  const org_id = req.params.organisation_id;
  const idSchema = yup.object().shape({
    id: yup.number().required(),
    org_id: yup.number().required(),
  });
  idSchema
    .isValid({
      id,
      org_id,
    })
    .then((valid) => {
      if (!valid) {
        res.send({
          status: 422,
          message: "id not be in correct format ",
        });
      } else {
        const schema = yup.object().shape({
          core_value_text: yup.string(),
          description: yup.string(),
          parent_core_value_id: yup.number(),
        });
        const corevalue = {
          core_value_text: req.body.core_value_text,
          description: req.body.description,
          parent_core_value_id: req.body.parent_core_value_id,
        };
        schema.isValid(corevalue).then(function (valid) {
          if (valid) {
            CoreValue.update(corevalue, {
              where: { id: id, org_id: org_id },
            })
              .then((num) => {
                if (num == 1) {
                  res.send({
                    message: "Tutorial was updated successfully.",
                  });
                } else {
                  res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
                  });
                }
              })
              .catch((err) => {
                res.status(500).send({
                  message: err + "Error updating Tutorial with id=" + id,
                });
              });
          } else {
            res.send({
              status: 422,
              message: "Contents not be in correct format ",
            });
          }
        });
      }
    });
};
