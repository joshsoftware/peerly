const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

const routes2 = require("./app/routes/logout.routes");
const dbConn = require("./app/models/sequelize");
require("dotenv").config("./.env");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dbConn.sequelize;
app.use("/v1", routes2);
const httpServer = http.createServer(app);
httpServer.listen(process.env.HTTP_PORT || 8080); // eslint-disable-line no-undef
