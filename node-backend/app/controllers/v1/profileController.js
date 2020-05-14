const yup = require("yup");

const utility = require("../../utils/utility");
const db = require("../../models/sequelize");
const Users = db.users;
const jwtToken = require("../../jwtTokenValidation/jwtValidation");

module.exports.getProfile = async (req, res) => {
  let userData = await jwtToken.getData(req.headers["authorization"]);
  Users.findByPk(userData.userId, {
    attributes: [
      "id",
      "first_name",
      "last_name",
      "email",
      "display_name",
      "profile_image_url",
      "role_id",
      "hi5_quota_balance",
      "org_id",
    ],
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
  const idSchema = yup.object().shape({
    id: yup
      .number()
      .typeError({ id: "should be number" })
      .required({ id: "required" }),
  });
  idSchema
    .validate({ id }, { abortEarly: false })
    .then(() => {
      Users.findAll({
        where: { id: id },
        attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
          "display_name",
          "profile_image_url",
          "role_id",
          "hi5_quota_balance",
          "org_id",
        ],
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
