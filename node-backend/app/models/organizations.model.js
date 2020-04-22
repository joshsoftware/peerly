module.exports = (sequelize, Sequelize) => {
  const Organizations = sequelize.define("organizations", {
    id: {
      type: Sequelize.INTEGER,
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      length: 50,
      notNull: true,
    },
    contact_email: {
      type: Sequelize.STRING,
      length: 50,
      notNull: false,
    },
    domain_name: {
      type: Sequelize.STRING,
      length: 45,
      notNull: true,
    },
    subscription_status: {
      type: Sequelize.INTEGER,
      notNull: true,
    },
    subscription_valid_upto: {
      type: "TIMESTAMP",
      notNull: true,
    },
    hi5_limit: {
      type: Sequelize.INTEGER,
      notNull: true,
    },
    hi5_quota_renewal_frequency: {
      type: Sequelize.STRING,
      length: 9,
      notNull: false,
    },
    timezone: {
      type: Sequelize.TEXT,
      notNull: true,
    },
  });
  return Organizations;
};
