'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_social extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_social.belongsTo(models.User)
    }
  }
  user_social.init({
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
    modelName: 'user_social',
    tableName: 'user_socials'
  });
  return user_social;
};