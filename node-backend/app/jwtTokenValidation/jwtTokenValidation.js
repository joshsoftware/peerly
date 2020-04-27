const jwt = require("jsonwebtoken");
module.exports.autheticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null)
    res.status(412).send({
      error: {
        message: "invalid token",
      },
    });
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
    if (err) {
      res.status(412).send({
        message: "invalid token",
      });
    } else {
      next();
    }
  });
};
