"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("classes_teachers", [
      {
        teacherId: 2,
        classId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teacherId: 2,
        classId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teacherId: 2,
        classId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("classes_teachers", null, {});
  },
};
