"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class classes_schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      classes_schedule.belongsTo(models.Class);
    }
  }
  classes_schedule.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      classId: DataTypes.INTEGER,
      schedule: DataTypes.INTEGER,
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "classes_schedule",
    }
  );
  return classes_schedule;
};
