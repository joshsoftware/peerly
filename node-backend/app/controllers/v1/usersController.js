const qs = require(/*eslint-disable  node/no-extraneous-require*/ "qs");
const db = require("../../models/sequelize");
const Users = db.users;
const Roles = db.roles;
const jwtToken = require("../../jwtTokenValidation/jwtValidation");
module.exports.findUsersByOrg = async (req, res) => {
  const authHeader = req.headers["authorization"];
  let userData = await jwtToken.getData(authHeader);
  let limit;
  let offset;
  let obj = qs.parse(req.query);
  if (obj.limit) {
    limit = obj.limit;
  } else {
    limit = 10;
  }
  if (obj.offset) {
    offset = obj.offset;
  } else {
    offset = 0;
  }
  if (obj.org_id) {
    let adminRoleId = await Users.findOne({
      where: { org_id: obj.org_id },
      attributes: ["role_id"],
    });
    if (adminRoleId.dataValues.role_id);
    {
      let adminRole = await Roles.findOne({
        where: { role_id: adminRoleId.dataValues.role_id },
        attributes: ["name"],
      });
      if (adminRole == "Super Admin") {
        Users.findAll({
          where: { org_id: userData.orgId },
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
            "soft_delete_by",
            "soft_delete_at",
          ],
          limit: limit,
          offset: offset,
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
    }
  } else {
    Users.findAll({
      where: { org_id: userData.orgId, role_id: 2 },
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
        "soft_delete_by",
        "soft_delete_at",
      ],
      limit: limit,
      offset: offset,
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
};
