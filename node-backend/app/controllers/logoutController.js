const jwt = require("jsonwebtoken");

const db = require("../models/sequelize");
const userBlacklistedTokens = db.user_blacklisted_tokens;
module.exports.logout = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let decode = jwt.decode(token);
  const user = {
    user_id: decode.sub,
    token: token,
    expiry_date: decode.exp,
  };
  userBlacklistedTokens
    .create(user)
    .then((user_blacklisted_tokens) => {
      let domainResult = user_blacklisted_tokens;
      res.status(200).send({ data: domainResult });
    })
    .catch(() => {
      res.status(500).send({
        error: {
          message: "internal server error",
        },
      });
    });
};
