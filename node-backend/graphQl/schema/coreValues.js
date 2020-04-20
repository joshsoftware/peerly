const graphql = require("graphql");
const Organizations = require("./organizations");

const Core_values = new graphql.GraphQLObjectType({
  name: "Core_values",
  fields: () => ({
    id: { type: graphql.GraphQLInt },
    org: {
      type: Organizations,
      sqlJoin: (core_valuesTable, organizationsTable) =>
        `${core_valuesTable}.org_id = ${organizationsTable}.id`,
    },
    core_value_text: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    parent_core_value_id: { type: graphql.GraphQLInt },
  }),
});

Core_values._typeConfig = {
  sqlTable: "core_values",
  uniqueKey: "id",
};

module.exports = Core_values;
