var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

var app = express();
app.use("/", graphqlHTTP({}));
app.listen(process.env.SERVER_PORT);
  console.log("Server running on port: " + process.env.SERVER_PORT);
