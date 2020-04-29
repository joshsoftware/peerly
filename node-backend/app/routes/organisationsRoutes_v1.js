const express = require("express");
const bodyParser = require("body-parser");
const organisationController = require("../controllers/v1/orgnizationController");
const orgRouter = express.Router();
orgRouter.use(bodyParser.urlencoded({ extended: true }));

orgRouter.post("/organisations", organisationController.create);

orgRouter.get("/organisations", organisationController.findAll);

orgRouter.get("/organisations/:id", organisationController.findOne);

orgRouter.put("/organisations/:id", organisationController.update);

module.exports = orgRouter;
