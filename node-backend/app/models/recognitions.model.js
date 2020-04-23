module.exports = (sequelize, Sequelize) => {
  const Recognitions = sequelize.define("recognitions", {
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
    recognition_text: {
      type: Sequelize.STRING,
      notNull: true,
    },
    recognition_for: {
      type: Sequelize.INTEGER,
      notNull: true,
    },
    recognition_by: {
      type: Sequelize.INTEGER,
      notNull: true,
    },
    recognition_on: {
      type: "TIMESTAMP",
      notNull: true,
    },
  });
  return Recognitions;
};
