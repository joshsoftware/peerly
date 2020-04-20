const Database = require("pg").Pool;
const database = new Database({
  user: "omkar",
  host: "127.0.0.1",
  database: "peerly",
  password: "****",
  port: 5432,
});

module.exports = database;
