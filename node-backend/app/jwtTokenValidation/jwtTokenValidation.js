const jwt = require("jsonwebtoken");
module.exports.autheticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null)
    return res.status(401).send({
      message: "Token not provided",
    });
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err)
      return res.status(403).send({
        message: "Not a valid token",
      });
    req.user = user;
    next();
  });
};
