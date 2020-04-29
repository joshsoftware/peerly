const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

require("dotenv").config("./.env");
require("./app/jwtTokenValidation/deleteExpiredToken.js"); // eslint-disable-line node/no-missing-require
const indexRoute = require("./app/routes/index");
const dbConn = require("./app/models/sequelize");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dbConn.sequelize;
app.use("/", indexRoute); // eslint-disable-line no-undef
const httpServer = http.createServer(app);
httpServer.listen(process.env.HTTP_PORT || 8080); // eslint-disable-line no-undef
