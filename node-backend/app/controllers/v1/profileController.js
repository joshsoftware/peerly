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

module.exports.getProfileById = async (req, res) => {
  const id = req.params.id;
  Users.findOne({
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
