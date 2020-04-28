module.exports = (sequelize, Sequelize) => {
  const User_Badges = sequelize.define(
    "user_badges",
    {
      id: {
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      badge_id: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      obtained_on: {
        type: "TIMESTAMP",
        notNull: true,
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
