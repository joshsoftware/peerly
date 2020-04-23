const express = require("express");
require("dotenv").config("./.env");
const bodyParser = require("body-parser");
const routes = require("./app/routes/routes");
const dbConn = require("./app/models/sequelize");
const app = express();
const http = require("http");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dbConn.sequelize;
app.use("/v1/login", routes);
const httpServer = http.createServer(app);
httpServer.listen(8080); // eslint-disable-line no-undef
