const express = require("express");
const bodyParser = require("body-parser");

const /*eslint-disable no-unused-vars*/ usersControllerV1 = require("../controllers/v1/usersController");
const /*eslint-disable no-unused-vars*/ profileControllerV1 = require("../controllers/v1/profileController");
const utility = require("../utils/utility");
const jwtValidate = require("../jwtTokenValidation/jwtValidation");
const usersRouter = express.Router();
usersRouter.use(bodyParser.urlencoded({ extended: true }));

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
usersRouter.get("/users", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "usersController"
  );
  /*eslint-disable no-eval*/ eval(controller).findUsersByOrg(req, res);
});

usersRouter.get("/users/me", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "usersController"
  );
  /*eslint-disable no-eval*/ eval(controller).getProfile(req, res);
});

usersRouter.get("/users/:id", authorizedRole, async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "usersController"
  );
  /*eslint-disable no-eval*/ eval(controller).getProfileById(req, res);
});

usersRouter.put("/users/me", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "usersController"
  );
  /*eslint-disable no-eval*/ eval(controller).updateUser(req, res);
});

module.exports = usersRouter;
