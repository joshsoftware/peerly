module.exports = (sequelize, Sequelize) => {
  const user_blacklisted_tokens = sequelize.define(
    "user_blacklisted_tokens",
    {
      id: {
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      token: {
        type: Sequelize.TEXT,
        notNull: true,
      },
      expires_at: {
        type: Sequelize.BIGINT,
        notNull: true,
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return user_blacklisted_tokens;
};
