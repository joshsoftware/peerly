const db = require("../models/sequelize");
const user_blacklisted_tokens = db.user_blacklisted_tokens;
module.exports.userBlacklistedToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let result;
  await user_blacklisted_tokens
    .findOne({ where: { token: token } })
    .then((data) => {
      result = data;
    })
    .catch(() => {
      res.status(500).send({
        error: {
          message: "internal server error",
        },
      });
    });
  if (result) {
    res.status(412).send({
      error: {
        message: "unauthorized user",
      },
    });
  } else {
    next();
  }
};
