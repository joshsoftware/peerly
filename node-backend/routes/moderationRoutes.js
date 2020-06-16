const express = require("express");
const bodyParser = require("body-parser");

const /*eslint-disable no-unused-vars*/ moderationControllerV1 = require("../controllers/v1/moderationController");
const utility = require("../utils/utility");
const moderationRouter = express.Router();
moderationRouter.use(bodyParser.urlencoded({ extended: true }));

moderationRouter.post(
  "/recognitions/:recognition_id/report",
  async (req, res) => {
    let controller = await utility.getVersionedController(
      req.headers,
      "moderationController"
    );
    /*eslint-disable no-eval*/ eval(controller).report(req, res);
  }
);

moderationRouter.post(
  "/recognitions/:recognition_id/review",
  async (req, res) => {
    let controller = await utility.getVersionedController(
      req.headers,
      "moderationController"
    );
    /*eslint-disable no-eval*/ eval(controller).review(req, res);
  }
);

module.exports = moderationRouter;
