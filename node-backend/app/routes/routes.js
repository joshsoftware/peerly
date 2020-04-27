const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const yup = require("yup");

const loginController = require("../controllers/loginController");
require("../google_auth/google_auth")();
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.post(
  "/oauth/google",
  (req, res, next) => {
    const accessToken = {
      token: req.body.access_token,
    };
    const schema = yup.object().shape({
      token: yup.string().required(),
    });
    schema.isValid(accessToken).then(function (valid) {
      if (valid) {
        next();
      } else {
        res.status(400).send({
          error: {
            message: "invalid access token",
          },
        });
      }
    });
  },
  passport.authenticate("google-token", { session: false }),
  loginController.login
);

module.exports = router;
