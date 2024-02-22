'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class students_attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      students_attendance.belongsTo(models.User, {foreignKey: "studentId"})
      students_attendance.belongsTo(models.Class)
    }
  }
  students_attendance.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    dateLearning: DataTypes.DATE,
    studentId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'students_attendance',
    freezeTableName: true,
    tableName: "students_attendance"
  });
  return students_attendance;
};