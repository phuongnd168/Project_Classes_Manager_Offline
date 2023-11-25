'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserColumn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserColumn.belongsTo(models.User)
    }
  }
  UserColumn.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    featureName: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    position: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserColumn',
  });
  return UserColumn;
};