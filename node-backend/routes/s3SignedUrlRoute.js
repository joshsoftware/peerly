const express = require("express");
const bodyParser = require("body-parser");

const /*eslint-disable no-unused-vars*/ s3SignedUrlControllerV1 = require("../controllers/v1/s3SignedUrlController");
const utility = require("../utils/utility");
const s3SignedUrl = express.Router();
s3SignedUrl.use(bodyParser.urlencoded({ extended: true }));

s3SignedUrl.get("/s3_signed_url", async (req, res) => {
  let controller = await utility.getVersionedController(
    req.headers,
    "s3SignedUrlController"
  );
  /*eslint-disable no-eval*/ eval(controller).getSignedUrl(req, res);
});

module.exports = s3SignedUrl;
