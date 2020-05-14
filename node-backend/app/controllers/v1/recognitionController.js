const yup = require("yup");
const moment = require("moment"); //eslint-disable-line node/no-extraneous-require
const qs = require("qs"); //eslint-disable-line node/no-extraneous-require

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

const validateCoreValue = async (req, res) => {
  const tokenData = await jwtValidate.getData(req.headers["authorization"]);
  return CoreValues.findByPk(req.body.core_value_id, {
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
        // CoreValue validate successfully
        return true;
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
};

const validateGivenFor = async (req, res) => {
  const tokenData = await jwtValidate.getData(req.headers["authorization"]);
  return Users.findByPk(req.body.given_for, { attributes: ["org_id"] })
    .then((data) => {
      if (data === null) {
        res.status(404).send({
          error: {
            message: "User with specified id is not found",
          },
        });
      } else if (data.dataValues.org_id == tokenData.orgId) {
        return true;
      } else {
        res.status(404).send({
          error: {
            message: "User not found in specified organisation",
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
};

const addRecognition = (req, res, recognitions) => {
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
};

module.exports.create = async (req, res) => {
  const tokenData = await jwtValidate.getData(req.headers["authorization"]);
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
    .then(async () => {
      if (await validateCoreValue(req, res)) {
        if (await validateGivenFor(req, res)) {
          await addRecognition(req, res, recognitions);
        }
      }
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

module.exports.findOne = async (req, res) => {
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

const createFilterQuery = (filterData, tokenData) => {
  const sqlQuery = "select * from recognitions where given_for";
  if (
    filterData.given_for == undefined &&
    filterData.core_value_id == undefined &&
    filterData.given_by == undefined
  ) {
    return sqlQuery.concat(
      " in (select id from users where org_id=" + tokenData.orgId + ")"
    );
  } else if (
    filterData.given_for == undefined &&
    filterData.given_for == undefined &&
    filterData.core_value_id != undefined
  ) {
    return sqlQuery.concat(
      " in (select id from users where org_id=" +
        tokenData.orgId +
        ") and core_value_id =" +
        filterData.core_value_id +
        ""
    );
  } else if (
    filterData.given_by == undefined &&
    filterData.core_value_id == undefined &&
    filterData.given_for != undefined
  ) {
    return sqlQuery.concat(
      " in (select id from users where org_id=" +
        tokenData.orgId +
        ") and given_for =" +
        filterData.given_for +
        ""
    );
  } else if (
    filterData.given_for == undefined &&
    filterData.core_value_id == undefined &&
    filterData.given_by != undefined
  ) {
    return sqlQuery.concat(
      " in (select id from users where org_id=" +
        tokenData.orgId +
        ") and given_by =" +
        filterData.given_by +
        ""
    );
  } else if (filterData.given_for == undefined) {
    return sqlQuery.concat(
      " in (select id from users where org_id=" +
        tokenData.orgId +
        ") and core_value_id =" +
        filterData.core_value_id +
        " and given_by =" +
        filterData.given_by +
        ""
    );
  } else if (filterData.given_by == undefined) {
    return sqlQuery.concat(
      " in (select id from users where org_id=" +
        tokenData.orgId +
        ") and core_value_id =" +
        filterData.core_value_id +
        " and given_for =" +
        filterData.given_for +
        ""
    );
  } else if (filterData.core_value_id == undefined) {
    return sqlQuery.concat(
      " in (select id from users where org_id=" +
        tokenData.orgId +
        ") and given_for =" +
        filterData.given_for +
        " and given_by =" +
        filterData.given_by +
        ""
    );
  } else {
    return sqlQuery.concat(
      " in (select id from users where org_id=" +
        tokenData.orgId +
        ") and core_value_id =" +
        filterData.core_value_id +
        " and given_for =" +
        filterData.given_for +
        " and given_by = " +
        filterData.given_by +
        ""
    );
  }
};

const getFilterData = (data) => {
  let filterData = {
    core_value_id: data.core_value_id,
    given_for: data.given_for,
    given_by: data.given_by,
    limit: data.limit || 100,
    offset: data.offset || null,
  };
  return filterData;
};

const getFilterSchema = () => {
  return yup.object().shape({
    core_value_id: yup
      .number()
      .typeError({ core_value_id: "should be number" }),
    given_for: yup.number().typeError({ given_for: "should be number" }),
    given_by: yup.number().typeError({ given_by: "should be number" }),
    limit: yup
      .number()
      .nullable()
      .typeError({ given_limit: "should be number" }),
    offset: yup
      .number()
      .nullable()
      .typeError({ given_offset: "should be number" }),
  });
};

module.exports.findAll = async (req, res) => {
  const tokenData = await jwtValidate.getData(req.headers["authorization"]);
  const filterSchema = getFilterSchema();
  const filterData = getFilterData(qs.parse(req.query));

  filterSchema
    .validate(filterData, { abortEarly: false })
    .then(() => {
      db.sequelize
        .query(
          createFilterQuery(filterData, tokenData) +
            "limit " +
            filterData.limit +
            " offset " +
            filterData.offset +
            ""
        )
        .then((info) => {
          let data = info[0];
          if (data[0] != undefined) {
            res.status(200).send({
              data: data,
            });
          } else {
            res.status(404).send({
              error: {
                message: "Recognition with specified organisation is not found",
              },
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
