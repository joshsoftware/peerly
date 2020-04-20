const jwt = require("jsonwebtoken");
var createToken = function (auth) {
  return jwt.sign(
    {
      id: auth.id,
    },
    "my-secret",
    {
      expiresIn: process.env.JWT_expire_time, //eslint-disable-line  no-undef
    }
  );
};

module.exports = {
  generateToken: function (req, res, next) {
    req.token = createToken(req.auth);
    return next();
  },
  sendToken: function (req, res) {
    return res.status(200).send(req.token);
  },
};
