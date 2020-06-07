const Sequelize = require("sequelize");
let path = require("path");
let dotEnvPath = path.resolve("../.env");
require("dotenv").config({ path: dotEnvPath });
const env = process.env.NODE_ENV || "test";
const dbConfig = require("../config/db.config")[env];

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
db.roles = require("../models/roles.model")(sequelize, Sequelize);
db.organizations = require("../models/organizations.model")(
  sequelize,
  Sequelize
);
db.users = require("../models/users.model")(sequelize, Sequelize);
db.core_value = require("../models/core_values.model")(sequelize, Sequelize);
db.badges = require("../models/badges.model")(sequelize, Sequelize);
db.user_blacklisted_tokens = require("../models/user_blacklisted_tokens.model")(
  sequelize,
  Sequelize
);
db.recognitions = require("../models/recognitions.model")(sequelize, Sequelize);
db.reported_recognitions = require("../models/reported_recognitions.model")(
  sequelize,
  Sequelize
);
db.recognition_moderation = require("../models/recognition_moderation.model")(
  sequelize,
  Sequelize
);
db.recognition_hi5 = require("../models/recognition_hi5.model")(
  sequelize,
  Sequelize
);
module.exports = db;
