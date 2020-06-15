"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "reported_recognitions",
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
        type_of_reporting: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        reason_for_reporting: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        reported_by: {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          allowNull: false,
        },
        reported_at: {
          type: Sequelize.BIGINT,
          allowNull: true,
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
    return queryInterface.dropTable("reported_recognitions");
  },
};
