"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
   
      Course.hasMany(models.course_module, { foreignKey: "courseId" });
      Course.hasMany(models.Class, { foreignKey: "courseId" });
    }
  }
  Course.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      tryLearn: DataTypes.BOOLEAN,
      duration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
      tableName: "courses"
    }
  );
  return Course;
};
