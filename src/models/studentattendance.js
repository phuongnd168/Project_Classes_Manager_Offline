'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentAttendance.belongsTo(models.User)
      StudentAttendance.belongsTo(models.Class)
    }
  }
  StudentAttendance.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    dateLearning: DataTypes.DATE,
    studentId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'StudentAttendance',
  });
  return StudentAttendance;
};