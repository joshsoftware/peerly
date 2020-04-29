const express = require("express");
const bodyParser = require("body-parser");
const CorevalueController = require("../controllers/v1/CoreValueController");
const jwtValidate = require("../jwtTokenValidation/jwtValidation");
const coreValueRouter = express.Router();
coreValueRouter.use(bodyParser.urlencoded({ extended: true }));

async function authorizedRole(req, res, next) {
  const authHeader = req.headers["authorization"];
  const tokenData = await jwtValidate.getData(authHeader);
  if (tokenData.roleId == 2) {
    next();
  } else {
    res.status(401).send({
      error: {
        message: "unauthorised user",
      },
    });
  }
}

//for create core value
coreValueRouter.post(
  "/organisations/:organisation_id/core_values",
  authorizedRole,
  CorevalueController.create
);
//for get all core values
coreValueRouter.get(
  "/organisations/:organisation_id/core_values",
  authorizedRole,
  CorevalueController.findAll
);
//for get core value by id
coreValueRouter.get(
  "/organisations/:organisation_id/core_values/:id",
  authorizedRole,
  CorevalueController.findOne
);
//for update core value
coreValueRouter.put(
  "/organisations/:organisation_id/core_values/:id",
  authorizedRole,
  CorevalueController.update
);

module.exports = coreValueRouter;
