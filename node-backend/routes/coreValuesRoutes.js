const express = require("express");
const bodyParser = require("body-parser");

const utility = require("../utils/utility");
const resConstants = require("../constant/responseConstants");
const /*eslint-disable no-unused-vars*/ CorevalueControllerV1 = require("../controllers/v1/CoreValueController");
const jwtValidate = require("../jwtTokenValidation/jwtValidation");
const coreValueRouter = express.Router();
coreValueRouter.use(bodyParser.urlencoded({ extended: true }));

async function authorizedRole(req, res, next) {
  const authHeader = req.headers["authorization"];
  const tokenData = await jwtValidate.getData(authHeader);
  if (utility.validateRole(tokenData.roleId, "OrganisationAdmin")) {
    next();
  } else {
    res
      .status(403)
      .send(
        utility.getErrorResponseObject(
          resConstants.ACCESS_DENIED_CODE,
          resConstants.ACCESS_DENIED_MESSAGE
        )
      );
  }
}

//for create core value
coreValueRouter.post("/core_values", authorizedRole, async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "CorevalueController"
  );
  /*eslint-disable no-eval*/ eval(controller).create(req, res);
});

//for update core value
coreValueRouter.put("/core_values/:id", authorizedRole, async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "CorevalueController"
  );
  eval(controller).update(req, res);
});

coreValueRouter.get("/core_values", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "CorevalueController"
  );
  eval(controller).getCoreValues(req, res);
});

coreValueRouter.get("/core_values/:id", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "CorevalueController"
  );
  eval(controller).getCoreValueById(req, res);
});
module.exports = coreValueRouter;
