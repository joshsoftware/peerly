module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      org_id: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      name: {
        type: Sequelize.STRING,
        length: 30,
        notNull: true,
      },
      email: {
        type: Sequelize.STRING,
        length: 50,
        notNull: true,
      },
      display_name: {
        type: Sequelize.STRING,
        length: 30,
        notNull: false,
      },
      profile_image_url: {
        type: Sequelize.STRING,
        notNull: false,
      },
      soft_delete: {
        type: Sequelize.BOOLEAN,
        notNull: true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      hi5_quota_balance: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      soft_delete_by: {
        type: Sequelize.INTEGER,
      },
      soft_delete_on: {
        type: "TIMESTAMP",
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Users;
};
