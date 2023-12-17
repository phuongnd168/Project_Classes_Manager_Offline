"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = bcrypt.hashSync("123", 10);
    const data = [];
    for (let i = 1; i < 50; i++) {
      data.push({
        name: `Phương${i}`,
        email: `phuong${i}@gmail.com`,
        password: password,
        phone: "0123456789",
        address: "Hà Nội",
        typeId: Math.floor(Math.random() * 3) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("users", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
