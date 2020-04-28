const yup = require("yup");
const moment = require("moment"); //eslint-disable-line node/no-extraneous-require

const db = require("../models/sequelize");
const jwtValidate = require("../jwtTokenValidation/jwtValidation");
const Recognitions = db.recognitions;
const CoreValues = db.coreValues;
const Users = db.users;

const schema = yup.object().shape({
  core_value_id: yup
    .number({ core_value_id: "should be number" })
    .required({ core_value_id: "required" })
    .typeError({ core_value_id: "should be number" }),
  recognition_text: yup
    .string({ recognition_text: "should be text" })
    .required({ recognition_text: "required" }),
  recognition_for: yup
    .number()
    .required({ recognition_for: "required" })
    .typeError({ recognition_for: "should be number" }),
  recognition_by: yup
    .number()
    .typeError({ recognition_by: "should be number" }),
  recognition_on: yup
    .number()
    .typeError({ recognition_on: "should be number" }),
});

exports.create = /*eslint-disable-line node/exports-style*/ async (
  req,
  res
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const tokenData = await jwtValidate.getData(token);
  // Create a Recognition
  const recognitions = {
    core_value_id: req.body.core_value_id,
    recognition_text: req.body.recognition_text,
    recognition_for: req.body.recognition_for,
    recognition_by: tokenData.userId,
    recognition_on: moment.utc().unix(),
  };
  // Validate request
  schema
    .validate(recognitions, { abortEarly: false })
    .then(() => {
      CoreValues.findByPk(req.body.core_value_id, {
        attributes: ["org_id"],
      })
        .then((data) => {
          if (data.dataValues.org_id == tokenData.orgId) {
            // Save Recognition in the database
            Users.findByPk(req.body.recognition_for, { attributes: ["org_id"] })
              .then((data) => {
                if (data.dataValues.org_id == tokenData.orgId) {
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
                      message: "Not found in organisation",
                    },
                  });
                }
              })
              .catch((err /*eslint-disable-line no-unused-vars*/) => {
                res.status(404).send({
                  error: {
                    message: "Core value with specified id not found",
                  },
                });
              });
          } else {
            res.status(404).send({
              error: {
                message: "core value not found with specified organisation id ",
              },
            });
          }
        })
        .catch((err /*eslint-disable-line no-unused-vars*/) => {
          res.status(404).send({
            error: {
              message: "Core value with specified id not found",
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
