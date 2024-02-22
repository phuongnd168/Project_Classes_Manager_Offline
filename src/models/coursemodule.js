'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course_module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      course_module.belongsTo(models.Course, { foreignKey: "courseId" })
        course_module.hasMany(models.module_document, {foreignKey: "moduleId"})
    }
  }
  course_module.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    courseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'course_module',
    tableName: "course_modules"
  });
  return course_module;
};