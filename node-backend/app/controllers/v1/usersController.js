const db = require("../../models/sequelize");
const jwtToken = require("../../jwtTokenValidation/jwtValidation");
module.exports.findUsersByOrg = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let userData = await jwtToken.getData(token);
  db.sequelize
    .query(
      "select distinct users.id,users.first_name,users.email,users.display_name,users.profile_image_url,users.role_id,users.hi5_quota_balance from users, roles where org_id = '" +
        userData.orgId +
        "' and role = 'Employee'"
    )
    .then((users) => {
      res.status(200).send({
        data: users[0],
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
