const { check } = require("express-validator");
module.exports = () => {
  return [
    check("newPassword", "Mật khẩu mới bắt buộc phải nhập").notEmpty(),
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
