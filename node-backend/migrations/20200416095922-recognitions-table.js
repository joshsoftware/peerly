"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "recognitions",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        core_value_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "core_values",
            key: "id",
          },
        },
        text: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        given_for: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        given_by: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
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
    return queryInterface.dropTable("recognitions");
  },
};
