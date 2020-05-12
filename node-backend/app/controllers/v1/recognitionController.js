const yup = require("yup");
const moment = require("moment"); //eslint-disable-line node/no-extraneous-require

const db = require("../../models/sequelize");
const jwtValidate = require("../../jwtTokenValidation/jwtValidation");
const utility = require("../../utils/utility");
const Recognitions = db.recognitions;
const CoreValues = db.coreValues;
const Users = db.users;

const schema = yup.object().shape({
  core_value_id: yup
    .number({ core_value_id: "should be number" })
    .required({ core_value_id: "required" })
    .typeError({ core_value_id: "should be number" }),
  text: yup.string({ text: "should be text" }).required({ text: "required" }),
  given_for: yup
    .number()
    .required({ given_for: "required" })
    .typeError({ given_for: "should be number" }),
  given_by: yup.number().typeError({ given_by: "should be number" }),
  given_at: yup.number().typeError({ given_at: "should be number" }),
});

exports.create = /*eslint-disable-line node/exports-style*/ async (
  req,
  res
) => {
  const authHeader = req.headers["authorization"];
  const tokenData = await jwtValidate.getData(authHeader);
  // Create a Recognition
  const recognitions = {
    core_value_id: req.body.core_value_id,
    text: req.body.text,
    given_for: req.body.given_for,
    given_by: tokenData.userId,
    given_at: moment.utc().unix(),
  };
  // Validate request
  schema
    .validate(recognitions, { abortEarly: false })
    .then(() => {
      CoreValues.findByPk(req.body.core_value_id, {
        attributes: ["org_id"],
      })
        .then((data) => {
          if (data === null) {
            res.status(404).send({
              error: {
                message: "core value not found with specified id",
              },
            });
          } else if (data.dataValues.org_id == tokenData.orgId) {
            // Save Recognition in the database
            Users.findByPk(req.body.given_for, { attributes: ["org_id"] })
              .then((data) => {
                if (data === null) {
                  res.status(404).send({
                    error: {
                      message: "User with specified id is not found",
                    },
                  });
                } else if (data.dataValues.org_id == tokenData.orgId) {
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
                      message: "User not found in specified organition",
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
          } else {
            res.status(404).send({
              error: {
                message: "core value not found with specified organisation",
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
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid recognition",
          "invalid recognition Data",
          err.errors
        ),
      });
    });
};

exports.findOne = /*eslint-disable-line node/exports-style*/ async (
  req,
  res
) => {
  const idSchema = yup.object().shape({
    id: yup
      .number()
      .required({ id: "required" })
      .typeError({ id: "should be number " }),
  });

  idSchema
    .validate({ id: req.params.id }, { abortEarly: false })
    .then(() => {
      Recognitions.findByPk(req.params.id)
        .then((data) => {
          if (data == null /*eslint-disable-line no-eq-null*/) {
            res.status(404).send({
              error: {
                message: "Recognition with specified id is not found",
              },
            });
          } else {
            res.status(200).send({
              data: data,
            });
          }
        })
        .catch(() => {
          res.status(500).send({
            error: {
              message: "internal server error ",
            },
          });
        });
    })
    .catch((err) => {
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid recognition",
          "invalid recognition Data",
          err.errors
        ),
      });
    });
};

exports.findAll = /*eslint-disable-line node/exports-style*/ async (
  req,
  res
) => {
  const authHeader = req.headers["authorization"];
  const tokenData = await jwtValidate.getData(authHeader);
  const filterSchema = yup.object().shape({
    core_value_id: yup
      .number()
      .typeError({ core_value_id: "should be number" }),
    given_for: yup.number().typeError({ given_for: "should be number" }),
    given_by: yup.number().typeError({ given_by: "should be number" }),
    limit: yup.number().typeError({ given_for: "should be number" }),
    offset: yup.number().typeError({ given_for: "should be number" }),
  });

  filterSchema
    .validate(req.body, { abortEarly: false })
    .then(() => {
      db.sequelize
        .query(
          "select * from recognitions where given_for in (select id from users where org_id=" +
            tokenData.orgId +
            ") limit " +
            req.body.limit +
            " offset " +
            req.body.offset +
            ""
        )
        .then((data) => {
          res.status(200).send({
            data: data[0],
          });
        })
        .catch(() => {
          res.status(500).send({
            error: {
              message: "internal server error ",
            },
          });
        });
    })
    .catch((err) => {
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid recognition",
          "invalid recognition Data",
          err.errors
        ),
      });
    });
};
