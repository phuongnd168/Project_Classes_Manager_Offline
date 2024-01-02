"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LearningStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LearningStatus.hasMany(models.students_class, { foreignKey: "statusId" });
    }
  }
  LearningStatus.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "LearningStatus",
    }
  );
  return LearningStatus;
};
