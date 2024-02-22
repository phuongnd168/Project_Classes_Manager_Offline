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
      Class.belongsTo(models.User, { foreignKey: "teacherId" });
      Class.belongsToMany(models.User, {
        through: "classes_teachers",
        foreignKey: "classId",
      });
      Class.hasMany(models.classes_schedule, { foreignKey: "classId" });
      Class.hasMany(models.teacher_calendar, { foreignKey: "classId" });
      Class.hasMany(models.students_class, { foreignKey: "classId" });
      Class.hasMany(models.students_attendance, { foreignKey: "classId" });
      Class.hasMany(models.Exercise, { foreignKey: "classId" });
      Class.hasMany(models.Comment, { foreignKey: "classId" });
      Class.belongsTo(models.Course, { foreignKey: "courseId" });
      Class.hasMany(models.questions, {foreignKey: "classId"})
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
      timeLearn: DataTypes.STRING,
      courseId: DataTypes.INTEGER,
      teacherId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Class",
      tableName: "classes"
    }
  );
  return Class;
};
