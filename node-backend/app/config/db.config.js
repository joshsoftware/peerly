/*eslint-disable  no-undef*/
module.exports = {
  HOST: process.env.DATABASE_URL,
  USER: process.env.DB_USER_NAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE_NAME,
  dialect: "postgres",
  pool: {
    max: parseInt(process.env.SEQUELIZE_CONN_MAX),
    min: parseInt(process.env.SEQUELIZE_CONN_MIN),
    acquire: process.env.SEQUELIZE_CONN_ACQUIRE,
    idle: process.env.SEQUELIZE_CONN_IDLE,
  },
};
/*eslint-enable  no-undef*/
