"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = bcrypt.hashSync("123", 10);
    return queryInterface.bulkInsert("users", [
      {
        name: "Phương",
        email: "phuong@gmail.com",
        password: password,
        phone: "0123456789",
        address: "Hà Nội",
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Phương1",
        email: "phuong1@gmail.com",
        password: password,
        phone: "0123456789",
        address: "Hà Nội",
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Phương2",
        email: "phuong2@gmail.com",
        password: password,
        phone: "0123456789",
        address: "Hà Nội",
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Phương3",
        email: "phuong3@gmail.com",
        password: password,
        phone: "0123456789",
        address: "Hà Nội",
        typeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
