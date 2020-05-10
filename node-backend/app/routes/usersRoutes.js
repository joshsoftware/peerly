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

module.exports = usersRouter;
