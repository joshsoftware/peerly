const db = require("../models/sequelize");
module.exports.userBlacklistedToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let result;
  await db.sequelize
    .query(
      "select id from user_blacklisted_tokens where token = '" + token + "'"
    )
    .then((data) => {
      result = data[1].rowCount;
    })
    .catch(() => {
      res.status(500).send({
        error: {
          message: "internal server error",
        },
      });
    });
  if (result) {
    res.status(401).send({
      error: {
        message: "unauthorized user",
      },
    });
  } else {
    next();
  }
};
