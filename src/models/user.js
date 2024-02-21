"use strict";
const { Model, INTEGER } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Type);
      User.hasOne(models.login_token, { foreignKey: "userId" });
      User.hasMany(models.user_social, { foreignKey: "userId" });
      User.belongsToMany(models.Role, {
        through: "user_role",
        foreignKey: "userId",
      });
      User.hasOne(models.user_otp, { foreignKey: "userId" });
      User.hasOne(models.token_forgot_pass, { foreignKey: "userId" });
      User.hasMany(models.Class, { foreignKey: "teacherId" });
      User.belongsToMany(models.Class, {
        through: "classes_teachers",
        foreignKey: "teacherId",
      });
      User.hasMany(models.teacher_calendar, { foreignKey: "teacherId" });
      User.hasMany(models.students_class, { foreignKey: "studentId" });
      User.hasMany(models.exercises_submit, { foreignKey: "studentId" });
      User.hasMany(models.Comment, { foreignKey: "userId" });
      User.hasMany(models.students_attendance, {foreignKey: "studentId"})
      User.hasMany(models.questions, {foreignKey: "studentId"})
      User.hasMany(models.answers, {foreignKey: "teacherId"})
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      typeId: DataTypes.INTEGER,
      firstLogin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
