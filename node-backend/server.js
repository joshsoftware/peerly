const express = require("express");
require("dotenv").config("./.env");
const bodyParser = require("body-parser");
const routes = require("./app/routes/routes");
const app = express();
const http = require("http");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/v1/login", routes);
const httpServer = http.createServer(app);
httpServer.listen(process.env.HTTP_PORT || 8080); // eslint-disable-line no-undef
