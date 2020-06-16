module.exports = (sequelize, Sequelize) => {
  const Roles = sequelize.define(
    "roles",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  Roles.associate = (models) => {
    Roles.hasMany(models.users, {
      foreignKey: "role_id",
      as: "users_role_id_fkey",
    });
  };
  return Roles;
};
