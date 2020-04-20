var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql"); // eslint-disable-line no-unused-vars
var queryRoot = require("./graphQl/query/queryResolver");
const schema = new buildSchema.GraphQLSchema({
  query: queryRoot,
});

var app = express();
app.use(
  "v1/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(process.env.SERVER_PORT); // eslint-disable-line no-undef
