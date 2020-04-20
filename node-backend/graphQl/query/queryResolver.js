const graphql = require("graphql");
const joinMonster = require("join-monster");
const Recognitions = require("../schema/recognitions");
const HOST = process.env.HOST; // eslint-disable-line no-undef
const USER = process.env.USER; // eslint-disable-line no-undef
const PASSWORD = process.env.PASSWORD; // eslint-disable-line no-undef
const DATABASE = process.env.DATABASE; // eslint-disable-line no-undef
const { Client } = require("pg");

const client = new Client({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
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
