'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("learning_status", [
      {
        name: "Đang học",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bảo lưu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Thôi học",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hoàn thành",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("learning_status", null, {});
  }
};
