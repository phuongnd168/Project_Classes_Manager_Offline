const { check } = require("express-validator");

module.exports = () => {
  return [
    check("comment", "Vui lòng nhập câu trả lời").notEmpty(),

  ];
};
