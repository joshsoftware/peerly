const db = require("../models/sequelize");
const jwtToken = require("../jwtTokenValidation/jwtValidation");
module.exports.findUsersByOrg = (req, res) => {
  let token = jwtToken.getData(req, res);
  db.sequelize
    .query(
      "select id,name,email,display_name,profile_image_url,role_id,hi5_quota_balance from users where org_id = '" +
        token.orgId +
        "' and role_id not in (select id from roles where role = 'admin')"
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
