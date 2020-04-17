var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql"); // eslint-disable-line no-unused-vars

var app = express();
app.use("v1/graphql", graphqlHTTP({}));
app.listen(process.env.SERVER_PORT); // eslint-disable-line no-undef
