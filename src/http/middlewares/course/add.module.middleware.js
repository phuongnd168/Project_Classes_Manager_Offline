const { check } = require("express-validator");

module.exports = () => {
  return [
    check("chapter", "Tên chương bắt buộc phải nhập").notEmpty(),
  ];
};
