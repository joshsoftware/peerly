const express = require("express");
const bodyParser = require("body-parser");

const utility = require("../utils/utility");
const /*eslint-disable no-unused-vars*/ recognitionControllerV1 = require("../controllers/v1/recognitionController");
const jwtValidate = require("../jwtTokenValidation/jwtValidation");
const recRouter = express.Router();

async function authorizedRole(req, res, next) {
  const authHeader = req.headers["authorization"];
  const tokenData = await jwtValidate.getData(authHeader);
  if (tokenData.roleId !== 2) {
    next();
  } else {
    res.status(401).send({
      error: {
        message: "unauthorised user",
      },
    });
  }
}

recRouter.use(bodyParser.urlencoded({ extended: true }));

recRouter.use(authorizedRole);
/*eslint-disable  no-eval*/
recRouter.post("/organisations/recognitions", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "recognitionController"
  );
  eval(controller).create(req, res);
});

recRouter.get("/organisations/recognitions/:id", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "recognitionController"
  );
  eval(controller).findOne(req, res);
});

recRouter.post("/organisations/recognitions/search", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "recognitionController"
  );
  eval(controller).findAll(req, res);
});

module.exports = recRouter;
