const express = require("express");
const bodyParser = require("body-parser");

const token = require("../jwtTokenValidation/jwtTokenValidation");
const blacklistedToken = require("../jwtTokenValidation/blacklistedToken");
const logoutController = require("../controllers/logoutController");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.get(
  "/logout",
  blacklistedToken.userBlacklistedToken,
  token.autheticateToken,
  logoutController.logout
);

module.exports = router;
