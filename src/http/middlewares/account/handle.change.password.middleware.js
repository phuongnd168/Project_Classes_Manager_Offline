const { check } = require("express-validator");

const bcrypt = require("bcrypt");
module.exports = () => {
  return [
    check("oldPassword", "Mật khẩu cũ bắt buộc phải nhập").notEmpty(),
    check("newPassword", "Mật khẩu mới bắt buộc phải nhập").notEmpty(),
    check(
      "confirmNewPassword",
      "Mật khẩu nhập lại bắt buộc phải nhập"
    ).notEmpty(),

    check("oldPassword").custom(async (passValue, { req }) => {
      const { password } = req.user;
      const isPassword = bcrypt.compareSync(passValue, password);
      if (!isPassword) {
        throw new Error("Sai mật khẩu cũ");
      }
    }),
    check("newPassword").custom(async (passValue, { req }) => {
      const { confirmNewPassword } = req.body;
      if (passValue !== confirmNewPassword) {
        throw new Error("Mật khẩu nhập lại không trùng khớp");
      }
    }),
  ];
};
