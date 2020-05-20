const qs = require(/*eslint-disable  node/no-extraneous-require*/ "qs");
const moment = require("moment");
const log4js = require("log4js");

require("../../logger/loggerConfig");
const utility = require("../../utils/utility");
const db = require("../../models/sequelize");
const Users = db.users;
const jwtToken = require("../../jwtTokenValidation/jwtValidation");
const validateSchema = require("./validationSchema/UsersValidationSchema");
const logger = log4js.getLogger();

module.exports.findUsersByOrg = async (req, res) => {
  const authHeader = req.headers["authorization"];
  let userData = await jwtToken.getData(authHeader);
  const schema = validateSchema.findUsersByOrg();
  let obj = qs.parse(req.query);
  let limitOffsetObj = await utility.getLimitAndOffset(obj);

  schema
    .validate(obj, { abortEarly: false })
    .then(async () => {
      if (obj.org_id) {
        let superAdminAuth = await utility.validateRole(userData.roleId, [
          "SuperAdmin",
        ]);
        if (!superAdminAuth) {
          {
            res.status(403).send({
              error: {
                code: "access_denied",
                message: "Permission required",
              },
            });
          }
        } else {
          Users.findAll({
            where: { org_id: obj.org_id },
            attributes: { exclude: ["soft_delete"] },
            order: [["id", "ASC"]],
            limit: limitOffsetObj.limit,
            offset: limitOffsetObj.offset,
          })
            .then((users) => {
              res.status(200).send({
                data: users,
              });
            })
            .catch(() => {
              res.status(500).send({
                error: {
                  message: "internal server error",
                },
              });
            });
        }
      } else {
        Users.findAll({
          where: { org_id: userData.orgId, role_id: 3 },
          attributes: { exclude: ["soft_delete"] },
          order: [["id", "ASC"]],
          limit: limitOffsetObj.limit,
          offset: limitOffsetObj.offset,
        })
          .then((users) => {
            res.status(200).send({
              data: users,
            });
          })
          .catch(() => {
            res.status(500).send({
              error: {
                message: "internal server error",
              },
            });
          });
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid query params",
          "invalid query params data",
          err.errors
        ),
      });
    });
};

module.exports.getProfile = async (req, res) => {
  let userData = await jwtToken.getData(req.headers["authorization"]);
  Users.findByPk(userData.userId, {
    attributes: {
      exclude: ["soft_delete", "soft_delete_by", "soft_delete_at"],
    },
  })
    .then((profile) => {
      res.status(200).send({
        data: profile,
      });
    })
    .catch(() => {
      res.status(500).send({
        error: {
          message: "internal server error",
        },
      });
    });
};

module.exports.getProfileById = (req, res) => {
  const id = req.params.id;
  const idSchema = validateSchema.getProfileById();
  idSchema
    .validate({ id }, { abortEarly: false })
    .then(() => {
      Users.findAll({
        where: { id: id },
        attributes: {
          exclude: ["soft_delete", "soft_delete_by", "soft_delete_at"],
        },
      })
        .then((data) => {
          if (data.length != 0) {
            res.status(200).send({
              data: data,
            });
          } else {
            res.status(404).send({
              error: {
                message: "profile not found for specified id ",
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
        error: utility.getFormattedErrorObj(
          "invalid-user",
          "Invalid user data",
          err.errors
        ),
      });
    });
};

module.exports.updateUser = async (req, res) => {
  let userData = await jwtToken.getData(req.headers["authorization"]);
  const schema = validateSchema.updateUser();
  const updateUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    display_name: req.body.display_name,
    profile_image_url: req.body.profile_image_url,
  };

  schema
    .validate(updateUser, { abortEarly: false })
    .then(() => {
      Users.update(updateUser, {
        returning: true,
        where: { id: userData.userId },
      })
        .then(([rowsUpdate, [updateUsers]]) => {
          if (rowsUpdate == 1) {
            logger.info("updated user with id " + updateUsers.dataValues.id);
            res.status(200).send({
              data: updateUsers,
            });
          } else {
            logger.error(
              "user not found for specified id " + updateUsers.dataValues.id
            );
            res.status(404).send({
              error: {
                message: "user not found for specified id ",
              },
            });
          }
        })
        .catch(() => {
          logger.error("error accured at updation with id " + userData.userId);
          res.status(500).send({
            error: {
              message: "internal server error",
            },
          });
        });
    })
    .catch((err) => {
      logger.error(
        "error accured due to invalid data by user id " + userData.userId
      );
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid-user",
          "Invalid user data",
          err.errors
        ),
      });
    });
};

module.exports.updateUserByAdmin = async (req, res) => {
  const schema = validateSchema.updateUserByAdmin();
  const updateUserByAdmin = {
    role_id: req.body.role_id,
  };
  const updateUserValidation = {
    role_id: req.body.role_id,
    userId: req.params.id,
  };

  schema
    .validate(updateUserValidation, { abortEarly: false })
    .then(() => {
      Users.update(updateUserByAdmin, {
        returning: true,
        where: { id: req.params.id },
      })
        .then(([rowsUpdate, [updateUserByAdmin]]) => {
          if (rowsUpdate == 1) {
            logger.info(
              "updated user with id " +
                updateUserByAdmin.dataValues.id +
                " by admin"
            );
            res.status(200).send({
              data: updateUserByAdmin,
            });
          } else {
            logger.error(
              "user not found for specified id" +
                updateUserByAdmin.dataValues.id
            );
            res.status(404).send({
              error: {
                message: "user not found for specified id",
              },
            });
          }
        })
        .catch(() => {
          logger.error("error accured at updation with id " + req.params.id);
          res.status(500).send({
            error: {
              message: "internal server error",
            },
          });
        });
    })
    .catch((err) => {
      logger.error(
        "error accured due to invalid data by user id " + req.params.id
      );
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid-user",
          "Invalid user data",
          err.errors
        ),
      });
    });
};

module.exports.deleteUser = async (req, res) => {
  const authHeader = req.headers["authorization"];
  let userData = await jwtToken.getData(authHeader);
  const schema = validateSchema.softDeleteUser();
  const softDeleteUser = {
    soft_delete: true,
    soft_delete_by: userData.userId,
    soft_delete_at: moment.utc().unix(),
  };
  schema
    .validate({ id: req.params.id }, { abortEarly: false })
    .then(() => {
      Users.update(softDeleteUser, {
        returning: true,
        where: { id: req.params.id },
      })
        .then(([rowsUpdate, [updateUsers]]) => {
          logger.info(
            "soft deleted " +
              rowsUpdate +
              " user with id " +
              updateUsers.dataValues.id +
              " by admin"
          );
          res.status(200).send();
        })
        .catch(() => {
          logger.error("error accured at deletion by admin ");
          res.status(500).send({
            error: {
              message: "internal server error",
            },
          });
        });
    })
    .catch((err) => {
      logger.error("error accured due to invalid data by admin");
      res.status(400).send({
        error: utility.getFormattedErrorObj(
          "invalid-user",
          "Invalid user data",
          err.errors
        ),
      });
    });
};
