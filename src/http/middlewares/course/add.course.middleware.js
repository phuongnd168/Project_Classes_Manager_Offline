const { check } = require("express-validator");

module.exports = () => {
  return [
    check("name", "Tên khóa học bắt buộc phải nhập").notEmpty(),
    check("price", "Giá khóa học bắt buộc phải nhập").notEmpty(),
    check("quantity", "Số lượng học viên bắt buộc phải nhập").notEmpty(),
    check("duration", "Thời lượng học bắt buộc phải nhập").notEmpty(),
  ];
};
