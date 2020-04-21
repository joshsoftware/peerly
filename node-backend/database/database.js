const Database = require("pg").Pool;
const database = new Database({
  user: process.env.USER, //eslint-disable-line  no-undef
  host: process.env.HOST, //eslint-disable-line  no-undef
  database: process.env.DATABASE, //eslint-disable-line  no-undef
  password: process.env.PASSWORD, //eslint-disable-line  no-undef
  port: process.env.DB_PORT, //eslint-disable-line  no-undef
});

module.exports = database;
