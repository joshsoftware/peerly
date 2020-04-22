module.exports = {
  /*eslint-disable  no-undef*/
  HOST: process.env.HOST,
  USER: process.env.DB_USER_NAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE_NAME,
  dialect: process.env.DB_DIALECT,
  /*eslint-enable no-undef*/
  pool: {
    /*eslint-disable  no-undef*/
    max: parseInt(process.env.SEQUELIZE_CONN_MAX),
    min: parseInt(process.env.SEQUELIZE_CONN_MIN),
    acquire: process.env.SEQUELIZE_CONN_ACQUIRE,
    idle: process.env.SEQUELIZE_CONN_IDLE,
    /*eslint-enable  no-undef*/
  },
};
