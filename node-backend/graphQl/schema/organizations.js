const graphql = require("graphql");
const Users = require("./user"); // eslint-disable-line no-unused-vars
const DateTime = require("./dateTime");

const Organizations = new graphql.GraphQLObjectType({
  name: "Organizations",
  fields: () => ({
    id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    contact_email: { type: graphql.GraphQLString },
    domain_name: { type: graphql.GraphQLString },
    subscription_status: { type: graphql.GraphQLInt },
    subscription_valid_upto: { type: DateTime },
    hi5_limit: { type: graphql.GraphQLInt },
    hi5_quota_renewal_frequency: { type: graphql.GraphQLString },
    timezone: { type: graphql.GraphQLString },
  }),
});

Organizations._typeConfig = {
  sqlTable: "organizations",
  uniqueKey: "id",
};
module.exports = Organizations;
