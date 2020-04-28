const jwt = require("jsonwebtoken");

const db = require("../models/sequelize");
const UserBlacklistedTokens = db.userBlacklistedTokens;

module.exports.autheticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null /*eslint-disable-line no-eq-null*/) {
    res.status(401).send({
      error: {
        message: "unauthorised user",
      },
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
      if (err) {
        res.status(401).send({
          error: {
            message: "unauthorised user",
          },
        });
      } else {
        UserBlacklistedTokens.findOne({ where: { token: token } }).then(
          (data) => {
            if (data === null) {
              next();
            } else {
              res.status(401).send({
                error: {
                  message: "unauthorised user",
                },
              });
            }
          }
        );
      }
    });
  }
};

module.exports.getData = (token) => {
  let decode = jwt.decode(token);
  const tokenData = {
    userId: decode.sub,
    exp: decode.exp,
    roleId: decode["https://peerly.com"].roleId,
    orgId: decode["https://peerly.com"].orgId,
  };
  return tokenData;
};
