'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeacherCalendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TeacherCalendar.belongsTo(models.User)
      TeacherCalendar.belongsTo(models.Class)
    }
  }
  TeacherCalendar.init({
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
    modelName: 'TeacherCalendar',
  });
  return TeacherCalendar;
};