const graphql = require("graphql");
const Organizations = require("./organizations"); // eslint-disable-line no-unused-vars
const Roles = require("./role");
const DateTime = require("./dateTime");

const Users = new graphql.GraphQLObjectType({
  name: "Users",
  fields: () => ({
    id: { type: graphql.GraphQLInt },
    org: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString },
    display_name: { type: graphql.GraphQLString },
    profile_image_url: { type: graphql.GraphQLString },
    soft_delete: { type: graphql.GraphQLBoolean },
    role: {
      type: Roles,
      sqlJoin: (usersTable, rolesTable) =>
        `${usersTable}.role_id = ${rolesTable}.id`,
    },
    hi5_quota_balance: { type: graphql.GraphQLInt },
    soft_delete_by: { type: graphql.GraphQLInt },
    soft_delete_on: { type: DateTime },
  }),
});

Users._typeConfig = {
  sqlTable: "users",
  uniqueKey: "id",
};

module.exports = Users;
