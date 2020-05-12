const express = require("express");
const bodyParser = require("body-parser");

const utility = require("../utils/utility");
const /*eslint-disable no-unused-vars*/ recognitionControllerV1 = require("../controllers/v1/recognitionController");
const jwtValidate = require("../jwtTokenValidation/jwtValidation");
const recRouter = express.Router();

async function authorizedRole(req, res, next) {
  const authHeader = req.headers["authorization"];
  const tokenData = await jwtValidate.getData(authHeader);
  if (tokenData.roleId == 2 || tokenData.roleId == 3) {
    next();
  } else {
    res.status(403).send({
      error: {
        code: "access_denied",
        message: "Permission required",
      },
    });
  }
}

recRouter.use(bodyParser.urlencoded({ extended: true }));

/*eslint-disable  no-eval*/
recRouter.post("/recognitions", authorizedRole, async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "recognitionController"
  );
  eval(controller).create(req, res);
});

recRouter.get("/recognitions/:id", authorizedRole, async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "recognitionController"
  );
  eval(controller).findOne(req, res);
});

recRouter.get("/recognitions/", authorizedRole, async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "recognitionController"
  );
  eval(controller).findAll(req, res);
});

module.exports = recRouter;
