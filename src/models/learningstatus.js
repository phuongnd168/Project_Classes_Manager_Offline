"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class learning_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      learning_status.hasOne(models.students_class, { foreignKey: "statusId" });
    }
  }
  learning_status.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      sequelize,
      modelName: "learning_status",
    }
  );
  return learning_status;
};
