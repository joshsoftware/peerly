const express = require("express");
const router = express.Router();
const passport = require("passport");
const bodyParser = require("body-parser");
require("../google_auth/google_auth")();
router.use(bodyParser.urlencoded({ extended: true }));
router
  .route("/")
  .post(passport.authenticate("google-token", { session: false }), function (
    req,
    res
  ) {
    if (!req.user) {
      return res.send(401, "User Not Authenticated by google");
    }
    res.send(req.user);
  });

module.exports = router;
