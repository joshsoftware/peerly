const express = require("express");
const bodyParser = require("body-parser");

const recognitionController = require("../controllers/v1/recognitionController");
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

recRouter.post("/organisations/recognitions", recognitionController.create);

recRouter.get("/organisations/recognitions/:id", recognitionController.findOne);

module.exports = recRouter;
