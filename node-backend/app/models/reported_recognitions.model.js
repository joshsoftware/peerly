module.exports = (sequelize, Sequelize) => {
  const Reported_Recognitions = sequelize.define(
    "reported_recognitions",
    {
      id: {
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      recognition_id: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      type_of_reporting: {
        type: Sequelize.STRING,
        length: 45,
        notNull: true,
      },
      reason_for_reporting: {
        type: Sequelize.STRING,
        notNull: true,
      },
      reported_by: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      reported_at: {
        type: Sequelize.BIGINT,
        notNull: false,
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
