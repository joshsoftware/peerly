module.exports = (sequelize, Sequelize) => {
  const Core_values = sequelize.define(
    "core_values",
    {
      id: {
        type: Sequelize.INTEGER,
        notNull: true,
        autoIncrement: true,
        primaryKey: true,
      },
      org_id: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      text: {
        type: Sequelize.STRING,
        notNull: true,
      },
      thumbnail_url: {
        type: Sequelize.TEXT,
        notNull: false,
      },
      description: {
        type: Sequelize.STRING,
        length: 45,
        notNull: true,
      },
      parent_core_value_id: {
        type: Sequelize.INTEGER,
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
