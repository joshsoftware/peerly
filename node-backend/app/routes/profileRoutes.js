const express = require("express");
const bodyParser = require("body-parser");

const /*eslint-disable no-unused-vars*/ profileControllerV1 = require("../controllers/v1/profileController");
const utility = require("../utils/utility");
const profileRouter = express.Router();
profileRouter.use(bodyParser.urlencoded({ extended: true }));

profileRouter.get("users/me/profile", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "profileController"
  );
  /*eslint-disable no-eval*/ eval(controller).getProfile(req, res);
});
module.exports = profileRouter;
