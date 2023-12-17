"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("students_classes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
        onDelete: "CASCADE",
      },
      classId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "classes",
          },
          key: "id",
        },
        onDelete: "CASCADE",
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "learning_status",
          },
          key: "id",
        },
        onDelete: "CASCADE",
      },
      completed: {
        type: Sequelize.DATE,
      },
      dropDate: {
        type: Sequelize.DATE,
      },
      recover: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("students_classes");
  },
};
