module.exports = (sequelize, Sequelize) => {
  const RecognitionComments = sequelize.define("recognition_comments", {
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
    comment: {
      type: Sequelize.STRING,
      notNull: true,
    },
    comment_by: {
      type: Sequelize.INTEGER,
      notNull: true,
    },
    commented_on: {
      type: "TIMESTAMP",
      notNull: true,
    },
  });
  return RecognitionComments;
};
