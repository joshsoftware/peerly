module.exports = (sequelize, Sequelize) => {
  const Core_values = sequelize.define(
    "core_values",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      org_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      thumbnail_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      parent_core_value_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  Core_values.associate = (models) => {
    Core_values.hasMany(models.recognitions, { foreignKey: "core_value_id" });
  };
  return Core_values;
};
