const yup = require("yup");

const db = require("../../models/sequelize");
const Organizations = db.organizations;

const schema = yup.object().shape({
  name: yup.string().required({ name: "required" }),
  contact_email: yup.string().email({ contact_email: "should be valid" }),
  domain_name: yup
    .string()
    .matches(
      {
        regex: /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g,
      },
      { domain_name: "should be valid" }
    )
    .required({ domain_name: "required" }),
  subscription_status: yup
    .number()
    .required({ subscription_status: "required" }),
  subscription_valid_upto: yup.number().required({
    subscription_valid_upto: "required",
  }),
  hi5_limit: yup.number().required({ hi5_limit: "required" }),
  hi5_quota_renewal_frequency: yup
    .string({
      hi5_quota_renewal_frequency: "should be string",
    })
    .required({
      hi5_quota_renewal_frequency: "required",
    }),
  timezone: yup.string().required({ timezone: "required" }),
});

exports.create = /*eslint-disable-line node/exports-style*/ (req, res) => {
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
    })
    .catch((err) => {
      res.status(412).send({
        error: {
          code: "invalid organisation",
          message: "Invalid organisation Data",
          fields: err.errors,
        },
      });
    });
};

exports.findAll = /*eslint-disable-line node/exports-style*/ (req, res) => {
  Organizations.findAll()
    .then((info) => {
      res.status(200).send({
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
};

exports.findOne = /*eslint-disable-line node/exports-style*/ (req, res) => {
  const idSchema = yup.object().shape({
    id: yup.number({ id: "should be number" }).required({ id: "required" }),
  });
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
            res.status(404).send({
              error: {
                message: "Organisation with specified id not found",
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
        error: {
          code: "invalid orgnisation",
          message: "Invalid value for parameter id",
          fields: err.errors,
        },
      });
    });
};

exports.update = /*eslint-disable-line node/exports-style*/ (req, res) => {
  const id = req.params.id;
  const idSchema = yup.object().shape({
    id: yup.number().required(),
  });
  idSchema
    .isValid({
      id: req.params.id,
    })
    .then((valid) => {
      if (!valid) {
        res.status(412).send({
          error: {
            code: "invalid orgnisation",
            message: "Invalid value for parameter id",
            fields: [
              {
                id: "should be number",
              },
            ],
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
                  res.status(200).send({
                    data: updatedCoreValue,
                  });
                } else {
                  res.status(404).send({
                    error: {
                      message: "Organisation with specified id is not found",
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
                code: "invalid organisation",
                message: "Invalid organisation Data",
                fields: err.errors,
              },
            });
          });
      }
    });
};
