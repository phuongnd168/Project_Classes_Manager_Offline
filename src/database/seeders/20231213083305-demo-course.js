"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("courses", [
      {
        name: "Lập trình cơ bản với Javascript",
        price: 2000000,
        tryLearn: 3,
        quantity: 16,
        duration: 32,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lập trình nâng cao với Javascript",
        price: 3000000,
        tryLearn: 2,
        quantity: 16,
        duration: 24,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lập trình cơ bản với HTML/CSS",
        price: 1000000,
        tryLearn: 1,
        quantity: 16,
        duration: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("courses", null, {});
  },
};
