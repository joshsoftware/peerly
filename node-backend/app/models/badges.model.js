module.exports = (sequelize, Sequelize) => {
  const Badges = sequelize.define(
    "badges",
    {
      id: {
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        length: 45,
        notNull: true,
      },
      org_id: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      hi5_count_required: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      hi5_frequency: {
        type: Sequelize.STRING,
        length: 45,
        notNull: true,
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Badges;
};
