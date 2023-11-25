'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExerciseSubmit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ExerciseSubmit.belongsTo(models.Exercise)
      ExerciseSubmit.belongsTo(models.User)
    }
  }
  ExerciseSubmit.init({
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
    modelName: 'ExerciseSubmit',
  });
  return ExerciseSubmit;
};