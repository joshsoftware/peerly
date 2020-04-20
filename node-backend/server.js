var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql"); // eslint-disable-line no-unused-vars
const google_login = require('./routes/routes');

var app = express();
app.use("/v1/graphql", graphqlHTTP({}));
app.use('/v1/login',google_login);
app.listen(process.env.SERVER_PORT); // eslint-disable-line no-undef
