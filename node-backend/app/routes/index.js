const express = require("express");
const bodyParser = require("body-parser");
const routes = express.Router();

const sessionRoute = require("./sessionRoutes");
const usersRoute = require("./usersRoutes");
const profileRoute = require("./profileRoutes");
const coreValuesRoute = require("./coreValuesRoutes");
const orgRoute = require("./organisationsRoutes");
const badgesRoute = require("./badgesRoutes");
const jwtValidate = require("../jwtTokenValidation/jwtValidation");
const recognitionRoute = require("./recognitionRoutes");
const moderationRout = require("./moderationRoutes");

routes.use(bodyParser.urlencoded({ extended: true }));

routes.use("/", sessionRoute);
routes.use(jwtValidate.autheticateToken);
routes.use("/", usersRoute);
routes.use("/", profileRoute);
routes.use("/", coreValuesRoute);
routes.use("/", orgRoute);
routes.use("/", badgesRoute);
routes.use("/", recognitionRoute);
routes.use("/", moderationRout);

module.exports = routes;
