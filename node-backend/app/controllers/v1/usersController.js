const db = require("../../models/sequelize");
const Users = db.users;
const jwtToken = require("../../jwtTokenValidation/jwtValidation");
module.exports.findUsersByOrg = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let userData = await jwtToken.getData(token);
  Users.findAll({
    where: { org_id: userData.orgId, role_id: 2 },
    attributes: [
      "id",
      "first_name",
      "email",
      "display_name",
      "profile_image_url",
      "role_id",
      "hi5_quota_balance",
      "org_id",
    ],
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
};
