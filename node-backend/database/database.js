const Database = require("pg").Pool;
const database = new Database({
  user: process.env.User, //eslint-disable-line  no-undef
  host: process.env.Host, //eslint-disable-line  no-undef
  database: process.env.Database, //eslint-disable-line  no-undef
  password: process.env.Password, //eslint-disable-line  no-undef
  port: process.env.Db_port, //eslint-disable-line  no-undef
});

module.exports = database;
