const express = require("express");
const bodyParser = require("body-parser");

const /*eslint-disable no-unused-vars*/ usersControllerV1 = require("../controllers/v1/usersController");
const utility = require("../utils/utility");
const usersRouter = express.Router();
usersRouter.use(bodyParser.urlencoded({ extended: true }));

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

usersRouter.get("/users/:id", utility.authorizeAdmin, async (req, res) => {
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

usersRouter.put("/users/:id", utility.authorizeAdmin, async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "usersController"
  );
  /*eslint-disable no-eval*/ eval(controller).updateUserByAdmin(req, res);
});

usersRouter.delete("/users/:id", utility.authorizeAdmin, async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "usersController"
  );
  /*eslint-disable no-eval*/ eval(controller).deleteUser(req, res);
});

module.exports = usersRouter;
