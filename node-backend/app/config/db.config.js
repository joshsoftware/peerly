/*eslint-disable  no-undef*/
module.exports = function () {
  let development = {
    HOST: process.env.DATABASE_URL,
    USER: process.env.DB_USER_NAME,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: parseInt(process.env.SEQUELIZE_CONN_MAX),
      min: parseInt(process.env.SEQUELIZE_CONN_MIN),
      acquire: process.env.SEQUELIZE_CONN_ACQUIRE,
      idle: process.env.SEQUELIZE_CONN_IDLE,
    },
  };
  let test = {
    HOST: process.env.DATABASE_URL,
    USER: process.env.DB_USER_NAME,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.TEST_DB_NAME,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: parseInt(process.env.SEQUELIZE_CONN_MAX),
      min: parseInt(process.env.SEQUELIZE_CONN_MIN),
      acquire: process.env.SEQUELIZE_CONN_ACQUIRE,
      idle: process.env.SEQUELIZE_CONN_IDLE,
    },
  };
  switch (process.env.NODE_TYPE) {
    case "test":
      return test;
    default:
      return development;
  }
};
/*eslint-enable  no-undef*/
