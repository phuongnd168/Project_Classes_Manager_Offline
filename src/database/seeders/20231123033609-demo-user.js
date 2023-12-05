'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt")
module.exports = {
  async up (queryInterface, Sequelize) {
    const password = bcrypt.hashSync("123", 10);
    return queryInterface.bulkInsert("users", [
      {
        name: "Phương",
        email: "dauphaiphuong1@gmail.com",
        password: password,
        phone: "0123456789",
        address: "Hà Nội",
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Phương1",
        email: "dauphaiphuong2@gmail.com",
        password: password,
        phone: "0987654321",
        address: "Hồ Chí Minh",
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Phương2",
        email: "dauphaiphuong3@gmail.com",
        password: password,
        phone: "0976543210",
        address: "Đà Nẵng",
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  }
};
