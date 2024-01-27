const { check } = require("express-validator");

module.exports = () => {
  return [
    check("link", "Đường dẫn tài liệu bắt buộc phải nhập").notEmpty(),
  ];
};
