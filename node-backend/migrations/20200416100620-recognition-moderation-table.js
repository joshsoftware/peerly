"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
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
          references: {
            model: "recognitions",
            key: "id",
          },
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
          references: {
            model: "users",
            key: "id",
          },
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
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("recognition_moderation");
  },
};
