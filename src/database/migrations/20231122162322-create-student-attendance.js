'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students_attendance', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateLearning: {
        type: Sequelize.DATE
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users", 
          },
          key: "id", 
        },
      },
      classId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "classes", 
          },
          key: "id", 
        },
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('students_attendance');
  }
};