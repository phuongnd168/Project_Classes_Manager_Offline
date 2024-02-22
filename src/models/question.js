'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      questions.hasMany(models.answers,  {foreignKey: "questionId"})
      questions.belongsTo(models.User, {foreignKey: "studentId"});
      questions.belongsTo(models.Class, {foreignKey: "classId"});
    }
  }
  questions.init({
    content: DataTypes.TEXT,
    studentId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'questions',
    tableName: "questions"
  });
  return questions;
};