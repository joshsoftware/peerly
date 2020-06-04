const express = require("express");
const bodyParser = require("body-parser");

const utility = require("../utils/utility");
const /*eslint-disable no-unused-vars*/ organisationControllerV1 = require("../controllers/v1/organisationController");
const orgRouter = express.Router();
orgRouter.use(bodyParser.urlencoded({ extended: true }));
/*eslint-disable  no-eval*/
orgRouter.post("/organisations", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "organisationController"
  );
  eval(controller).create(req, res);
});

orgRouter.get("/organisations", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "organisationController"
  );
  eval(controller).findAll(req, res);
});

orgRouter.get("/organisations/:id", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "organisationController"
  );
  eval(controller).findOne(req, res);
});

orgRouter.put("/organisations/:id", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "organisationController"
  );
  eval(controller).update(req, res);
});
/*eslint-enable  no-eval*/

module.exports = orgRouter;
