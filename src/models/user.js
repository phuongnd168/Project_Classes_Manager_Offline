'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Type)
      User.hasOne(models.login_token, {foreignKey: "userId"})
      User.hasMany(models.user_social, {foreignKey: "userId"})
      User.belongsToMany(models.Role, {
        through: "user_role",
        foreignKey: "userId",
      });
      User.hasOne(models.user_otp, {foreignKey: "userId"})
      User.hasOne(models.token_forgot_pass, {foreignKey: "userId"})
      User.hasMany(models.Course, {foreignKey: "teacherId"})
      User.belongsToMany(models.Class, {
        through: "classes_teachers",
        foreignKey: "teacherId",
      });
      User.hasMany(models.TeacherCalendar, {foreignKey: "teacherId"})
      User.hasOne(models.StudentClass, {foreignKey: "studentId"})
      User.hasMany(models.ExerciseSubmit, {foreignKey: "studentId"})
      User.hasMany(models.Comment, {foreignKey: "studentId"})
      User.hasOne(models.UserColumn, {foreignKey: "userId"})
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    firstLogin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};