const { check } = require("express-validator");

module.exports = () => {
  return [
    check("question", "Vui lòng nhập nội dung câu hỏi").notEmpty(),

  ];
};
