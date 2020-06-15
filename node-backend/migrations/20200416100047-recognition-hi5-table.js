"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "recognition_hi5",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        recognition_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        given_by: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        given_at: {
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
    return queryInterface.dropTable("recognition_hi5");
  },
};
