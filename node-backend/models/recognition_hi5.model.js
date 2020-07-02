module.exports = (sequelize, Sequelize) => {
  let model;
  const Recognition_hi5 = sequelize.define(
    "recognition_hi5",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      recognition_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      given_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      given_at: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  Recognition_hi5.associate = (models) => {
    model = models;
    Recognition_hi5.belongsTo(models.recognitions, {
      foreignKey: "recognition_id",
    });
    Recognition_hi5.belongsTo(models.users, {
      foreignKey: "given_by",
      as: "given_by_user",
    });
  };
  Recognition_hi5.beforeCreate(async (giveHi5) => {
    //check hi5 quota limit
    let data = await model.users.findByPk(giveHi5.given_by, {
      attributes: ["hi5_quota_balance"],
    });
    if (data.dataValues.hi5_quota_balance == 0)
      throw { status: 422, message: "hi5 quota limit is empty" };
    //validate recognition id
    data = await model.recognitions.findOne({
      where: { id: giveHi5.recognition_id },
    });
    if (!data)
      throw { status: 404, message: "Recognition not found for specified id" };
    //check  give hi5 to self
    data = await model.recognitions.findOne({
      where: { id: giveHi5.recognition_id, given_for: giveHi5.given_by },
    });
    if (data) throw { status: 422, message: "not alow give hi5 to self" };
    //check give double hi5
    data = await model.recognition_hi5.findOne({
      where: {
        recognition_id: giveHi5.recognition_id,
        given_by: giveHi5.given_by,
      },
    });
    if (data) throw { status: 422, message: "double entry not alow" };
  });
  Recognition_hi5.afterCreate(async (giveHi5) => {
    await model.users.decrement(
      { hi5_quota_balance: 1 },
      { where: { id: giveHi5.given_by } }
    );
  });
  return Recognition_hi5;
};
