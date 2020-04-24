const express = require("express");
const bodyParser = require("body-parser");
const organisationController = require("../controllers/orgnizationController");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/organisations", organisationController.create);

router.get("/organisations", organisationController.findAll);

router.get("/organisations/:id", organisationController.findOne);

router.put("/organisations/:id", organisationController.update);

module.exports = router;
