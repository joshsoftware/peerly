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
  return Core_values;
};
