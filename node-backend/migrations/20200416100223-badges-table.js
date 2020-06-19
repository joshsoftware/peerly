"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "badges",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        org_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "organizations",
            key: "id",
          },
          allowNull: false,
        },
        hi5_count_required: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        hi5_frequency: {
          type: Sequelize.STRING(45),
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
    return queryInterface.dropTable("badges");
  },
};
