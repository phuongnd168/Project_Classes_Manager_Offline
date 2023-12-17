"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("classes", [
      {
        name: "Back-end K1",
        quantity: 16,
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 9000000000),
        schedule: 2,
        timeLearn: "20:00-22:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Front-end K1",
        quantity: 16,
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 8000000000),
        schedule: 6,
        timeLearn: "07:00-09:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fullstack K1",
        quantity: 16,
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 5000000000),
        schedule: 4,
        timeLearn: "14:00-16:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("classes", null, {});
  },
};
