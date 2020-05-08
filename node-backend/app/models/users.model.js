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
      first_name: {
        type: Sequelize.STRING,
        length: 50,
        notNull: true,
      },
      last_name: {
        type: Sequelize.STRING,
        length: 50,
        notNull: false,
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
        type: Sequelize.TEXT,
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
      soft_delete_at: {
        type: Sequelize.BIGINT,
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
