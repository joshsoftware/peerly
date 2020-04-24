const express = require("express");
const bodyParser = require("body-parser");

const logoutController = require("../controllers/logoutController");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.route("/logout").get(logoutController.logout);

module.exports = router;
