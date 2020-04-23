module.exports = (sequelize, Sequelize) => {
  const RecognitionHi5 = sequelize.define(
    "recognition_hi5",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        notNull: true,
      },
      recognition_id: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      hi5_by: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      hi5_given_on_date: {
        type: "TIMESTAMP",
        notNull: true,
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return RecognitionHi5;
};
