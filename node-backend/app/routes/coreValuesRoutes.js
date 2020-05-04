const express = require("express");
const bodyParser = require("body-parser");

const utility = require("../utils/utility");
const /*eslint-disable no-unused-vars*/ CorevalueControllerV1 = require("../controllers/v1/CoreValueController");
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
  async (req, res) => {
    let controller = await utility.getVersionedController(
      req.headers,
      "CorevalueController"
    );
    /*eslint-disable no-eval*/ eval(controller).create(req, res);
  }
);
//for get all core values
coreValueRouter.get(
  "/organisations/:organisation_id/core_values",
  authorizedRole,
  async (req, res) => {
    let controller = await utility.getVersionedController(
      req.headers,
      "CorevalueController"
    );
    eval(controller).findAll(req, res);
  }
);
//for get core value by id
coreValueRouter.get(
  "/organisations/:organisation_id/core_values/:id",
  authorizedRole,
  async (req, res) => {
    let controller = await utility.getVersionedController(
      req.headers,
      "CorevalueController"
    );
    eval(controller).findOne(req, res);
  }
);
//for update core value
coreValueRouter.put(
  "/organisations/:organisation_id/core_values/:id",
  authorizedRole,
  async (req, res) => {
    let controller = await utility.getVersionedController(
      req.headers,
      "CorevalueController"
    );
    eval(controller).update(req, res);
  }
);

module.exports = coreValueRouter;
