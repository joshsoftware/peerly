const jwt = require("jsonwebtoken");

const db = require("../models/sequelize");
const UserBlacklistedTokens = db.useeBlacklistedTokens;

module.exports.autheticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null)
    res.status(401).send({
      error: {
        message: "undefined token",
      },
    });
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
    if (err) {
      res.status(401).send({
        message: "Not a valid token",
      });
    } else {
      UserBlacklistedTokens.findOne({ where: { token: token } }).then(
        (data) => {
          if (data === null) {
            next();
          } else {
            res.status(401).send({
              message: "Not a valid token",
            });
          }
        }
      );
    }
  });
};

module.exports.getData = (req, res /*eslint-disable-line no-unused-vars*/) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let decode = jwt.decode(token);
  const tokenData = {
    user_id: decode.sub,
    role: decode["https://peerly.com"].roleId,
    org: decode["https://peerly.com"].orgId,
  };
  return tokenData;
};
