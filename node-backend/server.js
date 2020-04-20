var express = require("express");
var graphqlHTTP = require("express-graphql");
var { GraphQLSchema } = require("graphql"); // eslint-disable-line no-unused-vars
var queryRoot = require("./graphQl/query/queryResolver");

const schema = new GraphQLSchema({
  query: queryRoot,
});

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(process.env.SERVER_PORT); // eslint-disable-line no-undef
