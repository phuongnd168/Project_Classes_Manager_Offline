'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("permissions", [
      {
        value: "Phân quyền",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Thêm người dùng",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Sửa người dùng",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Xóa người dùng",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Xem người dùng",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Thêm học viên",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Sửa học viên",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Xóa học viên",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Xem học viên",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Thêm giảng viên",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Sửa giảng viên",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Xóa giảng viên",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Xem giảng viên",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Thêm khóa học",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Sửa khóa học",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Xóa khóa học",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Xem khóa học",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Thêm lớp học",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Sửa lớp học",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Xóa lớp học",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "Xem lớp học",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
   
   
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});
  }
};
