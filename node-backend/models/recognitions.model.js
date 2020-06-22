module.exports = (sequelize, Sequelize) => {
  const Recognitions = sequelize.define(
    "recognitions",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      core_value_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      given_for: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      given_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      given_at: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  Recognitions.associate = (models) => {
    Recognitions.belongsTo(models.users, {
      foreignKey: "given_for",
      as: "given_for_user",
    });
    Recognitions.belongsTo(models.core_values, {
      foreignKey: "core_value_id",
      as: "coreValue",
    });
    Recognitions.belongsTo(models.users, {
      foreignKey: "given_by",
      as: "given_by_user",
    });
    Recognitions.hasMany(models.recognition_hi5, {
      foreignKey: "recognition_id",
      as: "hi5Count",
    });
  };
  return Recognitions;
};
