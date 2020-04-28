const yup = require("yup");

const db = require("../models/sequelize");
const Recognitions = db.recognitions;
const CoreValues = db.coreValues;

const schema = yup.object().shape({
  core_value_id: yup
    .number({ core_value_id: "should be number" })
    .required({ core_value_id: "required" }),
  recognition_text: yup
    .string({ recognition_text: "should be text" })
    .required({ recognition_text: "required" }),
  recognition_for: yup
    .number({ recognition_for: "should be number" })
    .required({ recognition_for: "required" }),
  recognition_by: yup
    .number({ recognition_by: "should be number" })
    .required({ recognition_by: "required" }),
  recognition_on: yup
    .number({ recognition_on: "should be number" })
    .required({ recognition_on: "required" }),
});

exports.create = /*eslint-disable-line node/exports-style*/ (req, res) => {
  // Create a Recognition
  const recognitions = {
    core_value_id: req.body.core_value_id,
    recognition_text: req.body.recognition_text,
    recognition_for: req.body.recognition_for,
    recognition_by: req.body.recognition_by,
    recognition_on: req.body.recognition_on,
  };
  const idSchema = yup.object().shape({
    id: yup.number({ id: "should be number" }).required({ id: "required" }),
  });

  // Validate request
  idSchema
    .validate({ id: req.params.id }, { abortEarly: false })
    .then(() => {
      schema
        .validate(recognitions, { abortEarly: false })
        .then(() => {
          CoreValues.findByPk(req.body.core_value_id, {
            attributes: ["org_id"],
          })
            .then((data) => {
              if (data.dataValues.org_id == req.params.id) {
                // Save Recognition in the database
                Recognitions.create(recognitions)
                  .then((info) => {
                    res.status(201).send({
                      data: info,
                    });
                  })
                  .catch((err /*eslint-disable-line no-unused-vars*/) => {
                    res.status(500).send({
                      error: {
                        message: "internal server error",
                      },
                    });
                  });
              } else {
                res.status(404).send({
                  error: {
                    message: "core value not found with organisation id ",
                  },
                });
              }
            })
            .catch((err /*eslint-disable-line no-unused-vars*/) => {
              res.status(500).send({
                error: {
                  message: "internal server error",
                },
              });
            });
        })
        .catch((err) => {
          res.status(412).send({
            error: {
              code: "invalid recognition",
              message: "invalid recognition data",
              fields: err.errors,
            },
          });
        });
    })
    .catch((err) => {
      res.status(412).send({
        error: {
          code: "invalid recognition",
          message: "invalid recognition data",
          fields: err.errors,
        },
      });
    });
};
