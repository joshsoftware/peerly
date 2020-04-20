const graphql = require("graphql");
const Core_values = require("./coreValues");
const Users = require("./user");
const DateTime = require("./dataTime");
const Recognitions = new graphql.GraphQLObjectType({
  name: "Recognitions",
  fields: () => ({
    id: { type: graphql.GraphQLInt },
    core_value: {
      type: Core_values,
      sqlJoin: (recognitionsTable, core_valuesTable) =>
        `${recognitionsTable}.core_value_id = ${core_valuesTable}.id`,
    },
    recognition_text: { type: graphql.GraphQLString },
    recognition_for: {
      type: Users,
      sqlJoin: (recognitionsTable, usersTable) =>
        `${recognitionsTable}.recognition_for = ${usersTable}.id`,
    },
    recognition_by: {
      type: Users,
      sqlJoin: (recognitionsTable, usersTable) =>
        `${recognitionsTable}.recognition_by = ${usersTable}.id`,
    },
    recognition_on: { type: DateTime },
  }),
});

Recognitions._typeConfig = {
  sqlTable: "recognitions",
  uniqueKey: "id",
};

module.exports = Recognitions;
