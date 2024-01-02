const { check } = require("express-validator");
const model = require("../../../models/index");
const User = model.User;
module.exports = () => {
  return [
    check("email", "Email bắt buộc phải nhập").notEmpty(),
    check("email", "Email không đúng định dạng").isEmail(),
    check("name", "Tên bắt buộc phải nhập").notEmpty(),
    check("phone", "Số điện thoại bắt buộc phải nhập").notEmpty(),
    check("phone", "Số điện thoại không đúng định dạng").isMobilePhone("vi-VN"),
    check("address", "Địa chỉ bắt buộc phải nhập").notEmpty(),

    check("email").custom(async (emailValue, { req }) => {
      const user = await User.findOne({ where: { email: emailValue } });
      if (user) {
        throw new Error("Email đã tồn tại");
      }
    }),
  ];
};