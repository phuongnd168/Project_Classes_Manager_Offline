'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teacher_calendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      teacher_calendar.belongsTo(models.User, {foreignKey: "teacherId"})
      teacher_calendar.belongsTo(models.Class, {foreignKey: "classId"})
    }
  }
  teacher_calendar.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    teacherId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    scheduleDate: DataTypes.DATE
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'teacher_calendar',
  });
  return teacher_calendar;
};