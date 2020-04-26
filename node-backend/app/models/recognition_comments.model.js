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
      comment: {
        type: Sequelize.STRING,
        notNull: true,
      },
      comment_by: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      commented_on: {
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
