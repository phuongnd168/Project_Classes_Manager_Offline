'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exercises_submit', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      exercisesId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "exercises", 
          },
          key: "id", 
        },
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
      content: {
        type: Sequelize.TEXT
      },
      attachment: {
        type: Sequelize.STRING(200)
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
    await queryInterface.dropTable('exercises_submit');
  }
};