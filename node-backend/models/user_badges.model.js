module.exports = (sequelize, Sequelize) => {
  const User_Badges = sequelize.define(
    "user_badges",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      badge_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      obtained_at: {
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
  return User_Badges;
};
