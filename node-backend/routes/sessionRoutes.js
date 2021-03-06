const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const log4js = require("log4js");

const utility = require("../utils/utility");
const resConstants = require("../constant/responseConstants");
const loginController = require("../controllers/v1/loginController");
require("../google_auth/google_auth")();
const tokenValidation = require("../jwtTokenValidation/jwtValidation");
const /*eslint-disable no-unused-vars*/ logoutControllerV1 = require("../controllers/v1/logoutController");
const validateSchema = require("../controllers/v1/validationSchema/loginValidation");
require("../config/loggerConfig");

const logger = log4js.getLogger();
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
        logger.error("validation error");
        logger.error(JSON.stringify(err));
        logger.info("=========================================");
        res.status(400).send({
          error: utility.getFormattedErrorObj(
            resConstants.INVALID_TOKEN_CODE,
            resConstants.INVALID_TOKEN_MESSAGE,
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
