'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class token_forgot_pass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      token_forgot_pass.belongsTo(models.User)
    }
  }
  token_forgot_pass.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    token: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    expire: DataTypes.DATE,
    
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'token_forgot_pass',
  });
  return token_forgot_pass;
};