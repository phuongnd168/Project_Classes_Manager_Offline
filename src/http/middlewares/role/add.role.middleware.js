const { check } = require("express-validator");

module.exports = () => {
  return [
    check("role", "Vui lòng nhập tên vai trò").notEmpty(),
    check("permission", "Vui lòng chọn quyền").notEmpty(),
  ];
};
