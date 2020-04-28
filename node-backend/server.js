const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

require("dotenv").config("./.env");
require("./app/jwtTokenValidation/deleteExpiredToken.js"); // eslint-disable-line node/no-missing-require
const routes = require("./app/routes/session.routes"); // eslint-disable-line node/no-missing-require
const routes1 = require("./app/routes/organisation.routes");
const dbConn = require("./app/models/sequelize");
const jwtValidate = require("./app/jwtTokenValidation/jwtValidation");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dbConn.sequelize;
app.use("/v1", routes); // eslint-disable-line no-undef
app.use(jwtValidate.autheticateToken);
app.use("/v1", routes1);
const httpServer = http.createServer(app);
httpServer.listen(process.env.HTTP_PORT || 8080); // eslint-disable-line no-undef
