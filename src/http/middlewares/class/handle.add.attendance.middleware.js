const { check } = require("express-validator");

module.exports = () => {
  return [
    check("attendance", "Vui lòng chọn để điểm danh").notEmpty(),

  ];
};
