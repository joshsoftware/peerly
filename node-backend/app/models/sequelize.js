const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  port: 5432,
  host: "https://mypeerlyapp.herokuapp.com/",
  logging: true, //false
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.roles = require("./roles.model.js")(sequelize, Sequelize);
db.organizations = require("./organizations.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
module.exports = db;
