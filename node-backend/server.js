const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

require("dotenv").config("./.env");
require("./app/jwtTokenValidation/deleteExpiredToken");
const routes = require("./app/routes/session.routes");
const dbConn = require("./app/models/sequelize");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dbConn.sequelize;
app.use("/v1", routes);
const httpServer = http.createServer(app);
httpServer.listen(process.env.HTTP_PORT || 8080); // eslint-disable-line no-undef
