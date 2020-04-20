const graphql = require("graphql");
const joinMonster = require("join-monster");
const { Recognitions } = require("../schema//recognitions");

const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "jitendra",
  password: "jitu2121",
  database: "temp",
});
client.connect();

const queryRoot = new graphql.GraphQLObjectType({
  name: "Query",
  fields: () => ({
    recognitions: {
      type: new graphql.GraphQLList(Recognitions),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, (sql) => {
          return client.query(sql);
        });
      },
    },
    recognition: {
      type: Recognitions,
      args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
      where: (recognitionsTable, args) =>
        `${recognitionsTable}.id = ${args.id}`,
      resolve: (resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, (sql) => {
          return client.query(sql);
        });
      },
    },
  }),
});

module.exports = queryRoot;
