const { check } = require("express-validator");

module.exports = () => {
  return [
    check("password", "Mật khẩu bắt buộc phải nhập").notEmpty(),
    check("password2", "Mật khẩu nhập lại bắt buộc phải nhập").notEmpty(),
    check("password", "Mật khẩu mới bao gồm tối thiểu 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt và độ dài tối thiểu là 8").isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    }),
    check("password").custom(async (passValue, { req }) => {
      if (passValue !== req.body.password2) {
        throw new Error("Mật khẩu nhập lại không trùng khớp");
      }
    }),
  ];
};
