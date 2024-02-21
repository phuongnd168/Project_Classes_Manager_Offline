'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      answers.belongsTo(models.questions, {foreignKey: "questionId"});
      answers.belongsTo(models.User, {foreignKey: "teacherId"});
    }
  }
  answers.init({
    questionId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    teacherId: DataTypes.INTEGER,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'answers',
  });
  return answers;
};