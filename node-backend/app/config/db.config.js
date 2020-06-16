/*eslint-disable  no-undef*/
module.exports = {
  development: {
    HOST: process.env.DB_HOST,
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
  },
  test: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER_NAME,
    PASSWORD: process.env.TEST_DB_PASSWORD,
    DB: process.env.TEST_DB_NAME,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: parseInt(process.env.SEQUELIZE_CONN_MAX),
      min: parseInt(process.env.SEQUELIZE_CONN_MIN),
      acquire: process.env.SEQUELIZE_CONN_ACQUIRE,
      idle: process.env.SEQUELIZE_CONN_IDLE,
    },
  },
};
/*eslint-enable  no-undef*/
