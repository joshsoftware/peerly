const express = require("express");
const bodyParser = require("body-parser");
const routes = express.Router();

const sessionRoute = require("./sessionRoutes_v1");
const usersRoute = require("./usersRoutes_v1");
const coreValuesRoute = require("./coreValuesRoutes_v1");
const orgRoute = require("./organisationsRoutes_v1");
const badgesRoute = require("./badgesRoutes_v1");
const jwtValidate = require("../jwtTokenValidation/jwtValidation");
const recognitionRoute = require("./recognitionRoutes");

routes.use(bodyParser.urlencoded({ extended: true }));

routes.use("/", sessionRoute);
routes.use(jwtValidate.autheticateToken);
routes.use("/", usersRoute);
routes.use("/", coreValuesRoute);
routes.use("/", orgRoute);
routes.use("/", badgesRoute);
routes.use("/", recognitionRoute);

module.exports = routes;
