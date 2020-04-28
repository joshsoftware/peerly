const express = require("express");
const bodyParser = require("body-parser");
const BadgesController = require("../controllers/badgesController");
const badgesRouter = express.Router();
badgesRouter.use(bodyParser.urlencoded({ extended: true }));
//for create core value
badgesRouter.post(
  "/organisations/:organisation_id/badges",
  BadgesController.create
);
//for get all core values
badgesRouter.get(
  "/organisations/:organisation_id/badges",
  BadgesController.findAll
);
//for get core value by id
badgesRouter.get(
  "/organisations/:organisation_id/badges/:id",
  BadgesController.findOne
);
//for update core value
badgesRouter.put(
  "/organisations/:organisation_id/badges/:id",
  BadgesController.update
);

module.exports = badgesRouter;
