const express = require("express");
const bodyParser = require("body-parser");
const CorevalueController = require("../controllers/CoreValueController");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
//for create core value
router.post(
  "/organisations/:organisation_id/core_values",
  CorevalueController.create
);
//for get all core values
router.get(
  "/organisations/:organisation_id/core_values",
  CorevalueController.findAll
);
//for get core value by id
router.get(
  "/organisations/:organisation_id/core_values/:id",
  CorevalueController.findOne
);
//for update core value
router.put(
  "/organisations/:organisation_id/core_values/:id",
  CorevalueController.update
);

module.exports = router;
