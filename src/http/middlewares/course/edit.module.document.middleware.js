const { check } = require("express-validator");

module.exports = () => {
  return [
    check("title", "Vui lòng nhập tiêu đề tài liệu").notEmpty(),
    check("document", "Vui lòng nhập nội dung tài liệu").notEmpty(),
  ];
};
