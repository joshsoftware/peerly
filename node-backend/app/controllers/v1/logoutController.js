const db = require("../../models/sequelize");
const jsonwebtoken = require("../../jwtTokenValidation/jwtValidation");
const userBlacklistedTokens = db.user_blacklisted_tokens;
module.exports.logout = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let decode = await jsonwebtoken.getData(token);
  const user = {
    user_id: decode.userId,
    token: token,
    expiry_date: decode.exp,
  };
  userBlacklistedTokens
    .create(user)
    .then((user_blacklisted_tokens) => {
      res.status(201).send({ data: user_blacklisted_tokens });
    })
    .catch(() => {
      res.status(500).send({
        error: {
          message: "internal server error",
        },
      });
    });
};
