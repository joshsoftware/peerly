const graphql = require("graphql");

const Roles = new graphql.GraphQLObjectType({
  name: "Roles",
  fields: () => ({
    id: { type: graphql.GraphQLInt },
    role: { type: graphql.GraphQLString },
  }),
});

Roles._typeConfig = {
  sqlTable: "roles",
  uniqueKey: "id",
};

module.exports = Roles;
