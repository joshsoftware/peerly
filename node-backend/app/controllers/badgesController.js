const yup = require("yup");

const db = require("../models/sequelize");
const Badges = db.badges;

module.exports.create = (req, res) => {
  //validation schema
  const schema = yup.object().shape({
    org_id: yup
      .number({ org_id: "should be a number" })
      .required({ org_id: "required" }),
    name: yup.string().required({ name: "required" }),
    hi5_count_required: yup
      .number({ hi5_count_required: "should be a number" })
      .required({ hi5_count_required: "required" }),
    hi5_frequency: yup.string().required({ hi5_frequency: "required" }),
  });
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
      res.status(412).send({
        error: {
          code: "invalid-badges",
          message: "Invalid badges data",
          fields: err.errors,
        },
      });
    });
};
//get all badges
module.exports.findAll = (req, res) => {
  const org_id = req.params.organisation_id;
  const idSchema = yup.object().shape({
    org_id: yup
      .number({ org_id: "should be a number" })
      .required({ org_id: "required" }),
  });
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
          code: "invalid-badges",
          message: "Invalid badges data",
          fields: err.errors,
        },
      });
    });
};

//get badges with id
module.exports.findOne = (req, res) => {
  const id = req.params.id;
  const org_id = req.params.organisation_id;
  const idSchema = yup.object().shape({
    id: yup.number({ id: "should be a number" }).required({ id: "required" }),
    org_id: yup
      .number({ org_id: "should be a number" })
      .required({ org_id: "required" }),
  });
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
            res.status(404).send({
              error: {
                message: "Badge not found for specified id",
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
      res.status(412).send({
        error: {
          code: "invalid-badges",
          message: "Invalid badges data",
          fields: err.errors,
        },
      });
    });
};

//update badges with id
module.exports.update = (req, res) => {
  const id = req.params.id;
  const org_id = req.params.organisation_id;
  const name = req.body.name;
  const hi5_count_required = req.body.hi5_count_required;
  const hi5_frequency = req.body.hi5_frequency;
  const schema = yup.object().shape({
    id: yup.number({ id: "should be a number" }).required({ id: "required" }),
    org_id: yup
      .number({ org_id: "should be a number" })
      .required({ org_id: "required" }),
    name: yup.string(),
    hi5_frequency: yup.string(),
    hi5_count_required: yup.number({
      hi5_count_required: "Should be a number",
    }),
  });
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
            res.status(200).send({
              data: updatedBadges,
            });
          } else {
            res.status(404).send({
              error: {
                message: "Badge not found for specified id",
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
      res.status(412).send({
        error: {
          code: "invalid-badges",
          message: "Invalid badges data",
          fields: err.errors,
        },
      });
    });
};
