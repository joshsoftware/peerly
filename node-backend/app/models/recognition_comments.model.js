module.exports = (sequelize, Sequelize) => {
  const Recognition_comments = sequelize.define(
    "recognition_comments",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        notNull: true,
      },
      recognition_id: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      text: {
        type: Sequelize.STRING,
        notNull: true,
      },
      commented_by: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      commented_at: {
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
  return Recognition_comments;
};
