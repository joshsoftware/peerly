const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");

const utility = require("../utils/utility");
const loginController = require("../controllers/v1/loginController");
require("../google_auth/google_auth")();
const tokenValidation = require("../jwtTokenValidation/jwtValidation");
const /*eslint-disable no-unused-vars*/ logoutControllerV1 = require("../controllers/v1/logoutController");
const validateSchema = require("../controllers/v1/validationSchema/loginValidation");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post(
  "/oauth/google",
  (req, res, next) => {
    const accessToken = {
      token: req.body.access_token,
    };
    const schema = validateSchema.loginUser();
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

router.post("/logout", tokenValidation.autheticateToken, async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "logoutController"
  );
  /*eslint-disable no-eval*/ eval(controller).logout(req, res);
});

module.exports = router;
