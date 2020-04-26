const express = require("express");
const bodyParser = require("body-parser");

const usersController = require("../controllers/usersController");
const usersRouter = express.Router();
usersRouter.use(bodyParser.urlencoded({ extended: true }));
usersRouter.get("/users/:id", usersController.findUsersByOrg);
module.exports = usersRouter;
