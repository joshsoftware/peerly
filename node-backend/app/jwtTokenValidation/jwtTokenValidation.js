const jwt = require("jsonwebtoken");
module.exports.autheticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null)
    res.status(400).send({
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
      next();
    }
  });
};
