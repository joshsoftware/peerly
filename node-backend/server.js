const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT); // eslint-disable-line no-undef
