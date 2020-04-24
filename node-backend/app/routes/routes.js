const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");

const loginController = require("../controllers/loginController");
require("../google_auth/google_auth")();
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.post(
  "/login",
  passport.authenticate("google-token", { session: false }),
  loginController.login
);

module.exports = router;
