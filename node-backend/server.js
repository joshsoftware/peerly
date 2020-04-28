const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

require("dotenv").config("./.env");
const routes = require("./app/routes/routes");
const orgRoute = require("./app/routes/organisation.routes");
const dbConn = require("./app/models/sequelize");
const jwtValidate = require("./app/jwtTokenValidation/jwtValidation");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dbConn.sequelize;
app.use("/v1", routes);
app.use(jwtValidate.autheticateToken);
app.use("/v1", orgRoute);
const httpServer = http.createServer(app);
httpServer.listen(process.env.HTTP_PORT || 8080); // eslint-disable-line no-undef
