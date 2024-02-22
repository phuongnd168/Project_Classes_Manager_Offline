'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class module_document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      module_document.belongsTo(models.course_module, {foreignKey: "moduleId"})
    }
  }
  module_document.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title:  DataTypes.STRING,
    pathName: DataTypes.STRING,
    moduleId: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'module_document',
    tableName: "module_document"
  });
  return module_document;
};