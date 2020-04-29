const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const yup = require("yup");

const utility = require("../utils/utility");
const loginController = require("../controllers/v1/loginController");
require("../google_auth/google_auth")();
const tokenValidation = require("../jwtTokenValidation/jwtValidation");
const logoutController = require("../controllers/v1/logoutController");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.post(
  "/oauth/google",
  (req, res, next) => {
    const accessToken = {
      token: req.body.access_token,
    };
    const schema = yup.object().shape({
      token: yup.string().required({ token: "required" }),
    });
    schema
      .validate(accessToken, { abortEarly: false })
      .then(() => {
        next();
      })
      .catch((err) => {
        res.status(400).send({
          error: utility.getFormattedErrorObj(
            "invalid-token",
            "Invalid token data",
            err.errors
          ),
        });
      });
  },
  passport.authenticate("google-token", { session: false }),
  loginController.login
);

router.post(
  "/logout",
  tokenValidation.autheticateToken,
  logoutController.logout
);

module.exports = router;
