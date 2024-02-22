'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exercises_submit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      exercises_submit.belongsTo(models.Exercise, {foreignKey: "exercisesId"})
      exercises_submit.belongsTo(models.User, {foreignKey: "studentId"})
    }
  }
  exercises_submit.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    exercisesId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'exercises_submit',
    tableName: "exercises_submit"
  });
  return exercises_submit;
};