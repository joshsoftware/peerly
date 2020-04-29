const express = require("express");
const bodyParser = require("body-parser");
const CorevalueController = require("../controllers/v1/CoreValueController");
const coreValueRouter = express.Router();
coreValueRouter.use(bodyParser.urlencoded({ extended: true }));
//for create core value
coreValueRouter.post(
  "/organisations/:organisation_id/core_values",
  CorevalueController.create
);
//for get all core values
coreValueRouter.get(
  "/organisations/:organisation_id/core_values",
  CorevalueController.findAll
);
//for get core value by id
coreValueRouter.get(
  "/organisations/:organisation_id/core_values/:id",
  CorevalueController.findOne
);
//for update core value
coreValueRouter.put(
  "/organisations/:organisation_id/core_values/:id",
  CorevalueController.update
);

module.exports = coreValueRouter;
