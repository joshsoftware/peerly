module.exports = (sequelize, Sequelize) => {
  const Recognition_Moderation = sequelize.define(
    "recognition_moderation",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      recognition_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      is_inappropriate: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      moderator_comment: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      moderated_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      moderated_at: {
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
  return Recognition_Moderation;
};
