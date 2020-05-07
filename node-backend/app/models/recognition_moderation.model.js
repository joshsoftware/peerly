module.exports = (sequelize, Sequelize) => {
  const Recognition_Moderation = sequelize.define(
    "recognition_moderation",
    {
      id: {
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      recognition_id: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      is_inappropriate: {
        type: Sequelize.BOOLEAN,
        notNull: true,
      },
      moderated_comment: {
        type: Sequelize.STRING,
        length: 45,
        notNull: true,
      },
      moderated_by: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      moderated_at: {
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
  return Recognition_Moderation;
};
