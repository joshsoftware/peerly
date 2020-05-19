const express = require("express");
const bodyParser = require("body-parser");

const utility = require("../utils/utility");
//const /*eslint-disable no-unused-vars*/ recognitionHi5ControllerV1 = require("../controllers/v1/recognitionHi5Controller");
const recHi5Router = express.Router();

recHi5Router.use(bodyParser.urlencoded({ extended: true }));

/*eslint-disable  no-eval*/
recHi5Router.post("/recognitions/:recognition_id/hi5", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "recognitionHi5Controller"
  );
  eval(controller).create(req, res);
});

module.exports = recHi5Router;
