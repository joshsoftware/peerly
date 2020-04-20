const graphql = require("graphql");

const DateTime = new graphql.GraphQLScalarType({
  name: "DateTime",
  description: "Date custom scalar type",
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value; // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT /*eslint-disable-line no-undef*/) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  },
});

module.exports = DateTime;
