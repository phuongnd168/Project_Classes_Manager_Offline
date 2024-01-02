'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class students_class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      students_class.belongsTo(models.User, { foreignKey: "studentId" })
      students_class.belongsTo(models.Class)
      students_class.belongsTo(models.LearningStatus, { foreignKey: "statusId" })
    }
  }
  students_class.init({
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
    modelName: 'students_class',
  });
  return students_class;
};