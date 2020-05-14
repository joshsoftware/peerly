const express = require("express");
const bodyParser = require("body-parser");

const /*eslint-disable no-unused-vars*/ profileControllerV1 = require("../controllers/v1/profileController");
const utility = require("../utils/utility");
const profileRouter = express.Router();
profileRouter.use(bodyParser.urlencoded({ extended: true }));
const jwtValidate = require("../jwtTokenValidation/jwtValidation");

async function authorizedRole(req, res, next) {
  const tokenData = await jwtValidate.getData(req.headers["authorization"]);
  if (tokenData.roleId == (1 || 2)) {
    next();
  } else {
    res.status(401).send({
      error: {
        message: "unauthorised user",
      },
    });
  }
}

profileRouter.get("/users/me/profile", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "profileController"
  );
  /*eslint-disable no-eval*/ eval(controller).getProfile(req, res);
});

profileRouter.get("/users/:id/profile", authorizedRole, async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "profileController"
  );
  /*eslint-disable no-eval*/ eval(controller).getProfileById(req, res);
});

module.exports = profileRouter;
