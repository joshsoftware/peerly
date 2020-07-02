module.exports = (sequelize, Sequelize) => {
  let model;
  const Recognitions = sequelize.define(
    "recognitions",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      core_value_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      given_for: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  Recognitions.associate = (models) => {
    model = models;
    Recognitions.belongsTo(models.users, {
      foreignKey: "given_for",
      as: "given_for_user",
    });
    Recognitions.belongsTo(models.core_values, {
      foreignKey: "core_value_id",
      as: "coreValue",
    });
    Recognitions.belongsTo(models.users, {
      foreignKey: "given_by",
      as: "given_by_user",
      hooks: true,
    });
    Recognitions.hasMany(models.recognition_hi5, {
      foreignKey: "recognition_id",
    });
  };
  Recognitions.beforeCreate(async (recognition) => {
    let data = await model.users.findByPk(recognition.given_by, {
      attributes: ["hi5_quota_balance"],
    });
    if (data.dataValues.hi5_quota_balance == 0)
      throw { status: 422, message: "your hi5 limit is empty" };
  });
  Recognitions.afterCreate(async (recognition) => {
    let giveHi5 = {
      recognition_id: recognition.dataValues.id,
      given_by: recognition.dataValues.given_by,
      given_at: recognition.dataValues.given_at,
    };
    await model.recognition_hi5.create(giveHi5);
  });
  return Recognitions;
};
