const express = require("express");
require("dotenv").config("./.env");
const bodyParser = require("body-parser");
const googleLogin = require("./routes/routes");
const app = express();
const http = require("http");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/v1/login", googleLogin);
const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT); // eslint-disable-line no-undef
