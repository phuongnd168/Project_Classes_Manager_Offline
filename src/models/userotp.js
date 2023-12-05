'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_otp.belongsTo(models.User)
    }
  }
  user_otp.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    otp: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    expire: DataTypes.DATE,
    
  }, {
    sequelize,
    modelName: 'user_otp',
    freezeTableName: true,
  });
  return user_otp;
};