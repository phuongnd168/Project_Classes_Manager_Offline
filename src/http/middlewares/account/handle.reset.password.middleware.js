const { check } = require("express-validator");
module.exports = () => {
  return [
    check("newPassword", "Mật khẩu mới bắt buộc phải nhập").notEmpty(),
    check("newPassword", "Mật khẩu mới bao gồm tối thiểu 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt và độ dài tối thiểu là 8").isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    }),
    check(
      "confirmNewPassword",
      "Mật khẩu nhập lại bắt buộc phải nhập"
    ).notEmpty(),

    check("newPassword").custom(async (passValue, { req }) => {
      const { confirmNewPassword } = req.body;
      if (passValue !== confirmNewPassword) {
        throw new Error("Mật khẩu nhập lại không trùng khớp");
      }
    }),
  ];
};
