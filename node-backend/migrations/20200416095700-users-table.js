"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        org_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "organizations",
            key: "id",
          },
        },
        first_name: {
          type: Sequelize.STRING(50),
          length: 50,
          allowNull: false,
        },
        last_name: {
          type: Sequelize.STRING(50),
          length: 50,
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING(50),
          length: 50,
          allowNull: false,
        },
        display_name: {
          type: Sequelize.STRING(30),
          length: 30,
          allowNull: true,
        },
        profile_image_url: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        soft_delete: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        role_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "roles",
            key: "id",
          },
        },
        hi5_quota_balance: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        soft_delete_by: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        soft_delete_at: {
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
    return queryInterface.dropTable("users");
  },
};
