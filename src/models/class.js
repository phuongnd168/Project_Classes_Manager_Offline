"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Class.belongsToMany(models.User, {
        through: "classes_teachers",
        foreignKey: "classId",
      });
      Class.hasMany(models.TeacherCalendar, { foreignKey: "classId" });
      Class.hasMany(models.StudentClass, { foreignKey: "classId" });
      Class.hasMany(models.StudentAttendance, { foreignKey: "classId" });
      Class.hasMany(models.Exercise, { foreignKey: "classId" });
      Class.hasMany(models.Comment, { foreignKey: "classId" });
    }
  }
  Class.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      startDate: DataTypes.DATEONLY,
      endDate: DataTypes.DATEONLY,
      schedule: DataTypes.BOOLEAN,
      timeLearn: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
