const { check } = require("express-validator");

module.exports = () => {
  return [
    check("exercisesSubmit", "Vui lòng nhập câu trả lời").notEmpty(),

  ];
};
