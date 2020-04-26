const db = require("../models/sequelize");
module.exports.findUsersByOrg = (req, res) => {
  db.sequelize
    .query(
      "select name from users where org_id = '" +
        req.params.id +
        "' and role_id not in (select id from roles where role = 'admin')"
    )
    .then((users) => {
      res.status(200).send({
        data: {
          users: users[0],
        },
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
