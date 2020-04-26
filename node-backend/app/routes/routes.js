const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");

const loginController = require("../controllers/loginController");
require("../google_auth/google_auth")();
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.post(
  "/oauth/google",
  (req, res, next) => {
    if (req.body.access_token) {
      next();
    } else {
      res.status(400).send({
        error: {
          message: "invalid access token",
        },
      });
    }
  },
  passport.authenticate("google-token", { session: false }),
  loginController.login
);

module.exports = router;
