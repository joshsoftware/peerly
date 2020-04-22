module.exports = {
  HOST: process.env.HOST, //eslint-disable-line  no-undef
  USER: process.env.DB_USER_NAME, //eslint-disable-line  no-undef
  PASSWORD: process.env.DB_PASSWORD, //eslint-disable-line  no-undef
  DB: process.env.DB_DATABASE_NAME, //eslint-disable-line  no-undef
  dialect: "postgres",
  pool: {
    max: process.env.SEQUELIZE_CONN_MAX, //eslint-disable-line  no-undef
    min: process.env.SEQUELIZE_CONN_min, //eslint-disable-line  no-undef
    acquire: process.env.SEQUELIZE_CONN_ACQUIRE, //eslint-disable-line  no-undef
    idle: process.env.SEQUELIZE_CONN_IDLE, //eslint-disable-line  no-undef
  },
};
