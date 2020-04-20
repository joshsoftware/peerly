const express = require("express");
const bodyParser = require("body-parser");
const googleLogin = require("./routes/routes");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql"); // eslint-disable-line no-unused-vars
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
var http = require("http");
var httpServer = http.createServer(app);
app.use(bodyParser.json());
app.use("/v1/graphql", graphqlHTTP({}));
app.use("/login", googleLogin);
httpServer.listen(process.env.SERVER_PORT /* eslint-disable-line  no-undef*/);
