'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSocial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserSocial.hasMany(models.User)
    }
  }
  UserSocial.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    provider: DataTypes.STRING,
    providerId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserSocial',
  });
  return UserSocial;
};