const express = require("express");
const bodyParser = require("body-parser");

const token = require("../jwtTokenValidation/jwtTokenValidation");
const logoutController = require("../controllers/logoutController");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.route("/logout").get(token.autheticateToken, logoutController.logout);

module.exports = router;
