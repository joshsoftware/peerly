module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      org_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      display_name: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      profile_image_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      soft_delete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hi5_quota_balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      soft_delete_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      soft_delete_at: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  Users.associate = (models) => {
    Users.hasMany(models.recognitions, {
      foreignKey: "given_for",
      as: "given_for_user",
    });
    Users.hasMany(models.recognitions, {
      foreignKey: "given_by",
      as: "given_by_user",
    });
    Users.hasMany(models.recognition_hi5, {
      foreignKey: "given_by",
    });
    Users.belongsTo(models.organizations, {
      foreignKey: "org_id",
    });
  };
  return Users;
};
