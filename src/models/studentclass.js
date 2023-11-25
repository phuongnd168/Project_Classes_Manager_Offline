'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentClass.belongsTo(models.User)
      StudentClass.belongsTo(models.Class)
      StudentClass.belongsTo(models.LearningStatus)
    }
  }
  StudentClass.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    studentId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    completed: DataTypes.DATE,
    dropDate: DataTypes.DATE,
    recover: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'StudentClass',
  });
  return StudentClass;
};