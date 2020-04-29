const express = require("express");
const bodyParser = require("body-parser");
const BadgesController = require("../controllers/v1/badgesController");
const jwtValidate = require("../jwtTokenValidation/jwtValidation");
const badgesRouter = express.Router();
badgesRouter.use(bodyParser.urlencoded({ extended: true }));

async function authorizedRole(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const tokenData = await jwtValidate.getData(token);
  if (tokenData.roleId == 2) {
    next();
  } else {
    res.status(401).send({
      error: {
        message: "unauthorised user",
      },
    });
  }
}

//for create badges
badgesRouter.post(
  "/organisations/:organisation_id/badges",
  authorizedRole,
  BadgesController.create
);
//for get all badges
badgesRouter.get(
  "/organisations/:organisation_id/badges",
  authorizedRole,
  BadgesController.findAll
);
//for get badges by id
badgesRouter.get(
  "/organisations/:organisation_id/badges/:id",
  authorizedRole,
  BadgesController.findOne
);
//for update badges
badgesRouter.put(
  "/organisations/:organisation_id/badges/:id",
  authorizedRole,
  BadgesController.update
);

module.exports = badgesRouter;
