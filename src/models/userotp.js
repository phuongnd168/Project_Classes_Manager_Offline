'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserOTP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserOTP.belongsTo(models.User)
    }
  }
  UserOTP.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    otp: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    expire: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserOTP',
  });
  return UserOTP;
};