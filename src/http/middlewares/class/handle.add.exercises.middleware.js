const { check } = require("express-validator");

module.exports = () => {
  return [
    check("title", "Vui lòng nhập tiêu đề").notEmpty(),
    check("content", "Vui lòng nhập nội dung").notEmpty(),

  ];
};
