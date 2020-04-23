const express = require("express");
const router = express.Router();
const passport = require("passport");
const bodyParser = require("body-parser");
const loginController = require("../controllers/loginController");
require("../google_auth/google_auth")();
router.use(bodyParser.urlencoded({ extended: true }));
router
  .route("/")
  .post(
    passport.authenticate("google-token", { session: false }),
    loginController.login
  );

module.exports = router;
