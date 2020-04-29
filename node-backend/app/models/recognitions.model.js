module.exports = (sequelize, Sequelize) => {
  const Recognitions = sequelize.define(
    "recognitions",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        notNull: true,
      },
      core_value_id: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      text: {
        type: Sequelize.STRING,
        notNull: true,
      },
      given_for: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      given_by: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      given_at: {
        type: Sequelize.BIGINT,
        notNull: true,
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Recognitions;
};
