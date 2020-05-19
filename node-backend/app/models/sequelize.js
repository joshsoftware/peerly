const Sequelize = require("sequelize");

const dbConfig = require("../config/db.config.js");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.roles = require("./roles.model.js")(sequelize, Sequelize);
db.organizations = require("./organizations.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.core_value = require("./core_values.model")(sequelize, Sequelize);
db.badges = require("./badges.model")(sequelize, Sequelize);
db.user_blacklisted_tokens = require("./user_blacklisted_tokens.model")(
  sequelize,
  Sequelize
);
db.recognitions = require("./recognitions.model")(sequelize, Sequelize);
db.reported_recognitions = require("./reported_recognitions.model")(
  sequelize,
  Sequelize
);
db.recognition_moderation = require("./recognition_moderation.model")(
  sequelize,
  Sequelize
);

module.exports = db;
