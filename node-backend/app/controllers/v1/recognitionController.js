const moment = require("moment"); //eslint-disable-line node/no-extraneous-require
const qs = require("qs"); //eslint-disable-line node/no-extraneous-require

const db = require("../../models/sequelize");
const jwtValidate = require("../../jwtTokenValidation/jwtValidation");
const utility = require("../../utils/utility");
const validationSchema = require("./validationSchema/recognitionValidationSchema");
const Recognitions = db.recognitions;
const CoreValues = db.coreValues;
const Users = db.users;

const validateCoreValue = async (req, res, tokenData) => {
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

const validateGivenFor = async (req, res, tokenData) => {
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
  const schema = validationSchema.insertSchema();
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
      if (await validateCoreValue(req, res, tokenData)) {
        if (await validateGivenFor(req, res, tokenData)) {
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
  const idSchema = validationSchema.getByIdSchema();

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
  const sqlQuery =
    "select * from recognitions where given_for in (select id from users where org_id=" +
    tokenData.orgId +
    ")";
  let whereCondition = "";
  if (filterData.given_for) {
    whereCondition = " and given_for =" + filterData.given_for;
  }
  if (filterData.given_by) {
    whereCondition = whereCondition.concat(
      " and given_by =" + filterData.given_by
    );
  }
  if (filterData.core_value_id) {
    whereCondition = whereCondition.concat(
      " and core_value_id =" + filterData.core_value_id
    );
  }
  return sqlQuery.concat(whereCondition);
};

const getFilterData = (data) => {
  let filterData = {
    core_value_id: data.core_value_id,
    given_for: data.given_for,
    given_by: data.given_by,
    limit: data.limit || null,
    offset: data.offset || null,
  };
  return filterData;
};

module.exports.findAll = async (req, res) => {
  const tokenData = await jwtValidate.getData(req.headers["authorization"]);
  const filterSchema = validationSchema.getFilterSchema();
  const filterData = getFilterData(qs.parse(req.query));
  const paginationData = utility.getLimitAndOffset(filterData);

  filterSchema
    .validate(filterData, { abortEarly: false })
    .then(() => {
      db.sequelize
        .query(
          createFilterQuery(filterData, tokenData) +
            "limit " +
            paginationData.limit +
            " offset " +
            paginationData.offset +
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

const getValidateHi5Count = (req, res, id, orgId) => {
  return Users.findByPk(id, { attributes: ["hi5_quota_balance", "org_id"] })
    .then((data) => {
      if (data === null) {
        res.status(404).send({
          error: {
            message: "User with specified id is not found",
          },
        });
      } else if (data.dataValues.org_id !== orgId) {
        res.status(404).send({
          error: {
            message: "User with specified organisation is not found",
          },
        });
      } else if (data.dataValues.hi5_quota_balance > 0) {
        return data.dataValues.hi5_quota_balance;
      } else {
        res.status(404).send({
          error: {
            message: "User hi5 balance is Empty",
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

const getHi5Data = (data, recognition_id, given_by) => {
  let hi5Data = {
    recognition_id: recognition_id,
    given_by: given_by,
    given_at: moment.utc().unix(),
    comment: data.comment || null,
  };
  return hi5Data;
};

const validateRecognition = (req, res, id) => {
  return Recognitions.findByPk(id)
    .then(async (data) => {
      if (data == null /*eslint-disable-line no-eq-null*/) {
        res.status(404).send({
          error: {
            message: "Recognition with specified id is not found",
          },
        });
      } else {
        return true;
      }
    })
    .catch(() => {
      res.status(500).send({
        error: {
          message: "internal server error ",
        },
      });
    });
};

const decrementHi5Count = async (req, res, id, orgId) => {
  let hi5Count = (await getValidateHi5Count(res, res, id, orgId)) - 1;
  return Users.update(
    { hi5_quota_balance: hi5Count },
    {
      returning: true,
      where: { id: id },
    }
  )
    .then(([rowsUpdate]) => {
      if (rowsUpdate == 1) {
        return true;
      } else {
        res.status(404).send({
          error: {
            message: "User with specified id is not found",
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

const addHi5Entry = (req, res, data, orgId) => {
  /*
   RecognitionHi5.create(data)
    .then((info) => {
      res.status(201).send({
        data: info,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: {
          message: "internal server error",
        },
      });
    });
    */
  db.sequelize
    .query(
      "INSERT INTO recognition_hi5 (recognition_id,given_by,given_at,comment) VALUES (" +
        data.recognition_id +
        "," +
        data.given_by +
        "," +
        data.given_at +
        "," +
        data.comment +
        ")"
    )
    .then(async () => {
      if (await decrementHi5Count(req, res, data.given_by, orgId)) {
        res.status(201).send({
          data: data,
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

module.exports.giveHi5 = async (req, res) => {
  const tokenData = await jwtValidate.getData(req.headers["authorization"]);
  const idSchema = validationSchema.getByIdSchema();
  const schema = validationSchema.insertHi5Schema();
  const hi5Data = getHi5Data(
    req.body,
    req.params.recognition_id,
    tokenData.userId
  );

  idSchema
    .validate({ id: req.params.recognition_id }, { abortEarly: false })
    .then(() => {
      schema
        .validate(hi5Data, { abortEarly: false })
        .then(async () => {
          if (await validateRecognition(req, res, hi5Data.recognition_id)) {
            if (
              await getValidateHi5Count(
                req,
                res,
                hi5Data.given_by,
                tokenData.orgId
              )
            ) {
              await addHi5Entry(req, res, hi5Data, tokenData.orgId);
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
