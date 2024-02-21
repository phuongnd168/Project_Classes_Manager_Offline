const { check } = require("express-validator");

module.exports = () => {
  return [
    check("answer", "Vui lòng nhập câu trả lời").notEmpty(),

  ];
};
