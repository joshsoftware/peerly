module.exports = (sequelize, Sequelize) => {
  const Organizations = sequelize.define(
    "organizations",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      contact_email: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      domain_name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      subscription_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subscription_valid_upto: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      hi5_limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hi5_quota_renewal_frequency: {
        type: Sequelize.STRING(9),
        allowNull: true,
      },
      timezone: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  Organizations.associate = (models) => {
    Organizations.hasMany(models.users, {
      foreignKey: "org_id",
    });
  };
  return Organizations;
};
