module.exports = (sequelize, Sequelize) => {
  const Reported_Recognitions = sequelize.define(
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
  return Reported_Recognitions;
};
