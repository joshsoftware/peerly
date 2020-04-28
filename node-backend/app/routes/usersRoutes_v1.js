const express = require("express");
const bodyParser = require("body-parser");

const usersController = require("../controllers/v1/usersController");
const usersRouter = express.Router();
usersRouter.use(bodyParser.urlencoded({ extended: true }));
usersRouter.get("/users", usersController.findUsersByOrg);
module.exports = usersRouter;
