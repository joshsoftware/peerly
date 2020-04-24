const express = require("express");
const bodyParser = require("body-parser");
const organisationController = require("../controllers/orgnizationController");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/organisations", organisationController.create);

module.exports = router;
