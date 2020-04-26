const yup = require("yup");

const db = require("../models/sequelize");
const Badges = db.badges;

module.exports.create = (req, res) => {
  //validation schema
  const schema = yup.object().shape({
    org_id: yup
      .number("Id should be number")
      .required("organisation id required"),
    name: yup.string().required("name required"),
    hi5_count_required: yup
      .number("hi5 count is in nummber")
      .required("description required"),
    hi5_frequency: yup.string().required("hi5 frequency required"),
  });
  // Create a core value object
  const corevalue = {
    org_id: req.params.organisation_id,
    name: req.body.name,
    hi5_count_required: req.body.hi5_count_required,
    hi5_frequency: req.body.hi5_frequency,
  };

  schema
    .validate(corevalue, { abortEarly: false })
    .then(() => {
      // Save corevalue in the database
      Badges.create(corevalue)
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
      .number(" organisation id should be number")
      .required("organisation id required"),
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
    id: yup.number("Id should be number").required("id is required"),
    org_id: yup
      .number("organisation id should be number")
      .required("organisation id required"),
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
                message: "badges with specified id is not found",
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
  const name = req.body.name;
  const hi5_count_required = req.body.hi5_count_required;
  const hi5_frequency = req.body.hi5_frequency;
  const schema = yup.object().shape({
    id: yup.number("Id should be number").required("id required"),
    org_id: yup
      .number("organisation id should be number")
      .required("organisation id required"),
    name: yup.string(),
    hi5_frequency: yup.string(),
    hi5_count_required: yup.number("hi5 count required ahould be number"),
  });
  const corevalue = {
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
      Badges.update(corevalue, {
        where: { id: id, org_id: org_id },
      })
        .then((num) => {
          if (num == 1) {
            res.status(200).send({
              message: "badges is updated successfully.",
            });
          } else {
            res.status(404).send({
              error: {
                message: `Cannot update badges with id=${id}. Maybe badges was not found`,
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
