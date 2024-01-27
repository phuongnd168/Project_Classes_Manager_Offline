const { check } = require("express-validator");
const model = require("../../../models/index");
const User = model.User;
module.exports = () => {
  return [
    check("name", "Tên bắt buộc phải nhập").notEmpty(),
    check("phone", "Số điện thoại bắt buộc phải nhập").notEmpty(),
    check("phone", "Số điện thoại không đúng định dạng").isMobilePhone("vi-VN"),
    check("address", "Địa chỉ bắt buộc phải nhập").notEmpty(),

  ];
};
