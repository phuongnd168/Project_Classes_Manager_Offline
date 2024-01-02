const { check } = require("express-validator");

module.exports = () => {
  return [
    check("password", "Mật khẩu bắt buộc phải nhập").notEmpty(),
    check("password2", "Mật khẩu nhập lại bắt buộc phải nhập").notEmpty(),

    check("password").custom(async (passValue, { req }) => {
      if (passValue !== req.body.password2) {
        throw new Error("Mật khẩu nhập lại không trùng khớp");
      }
    }),
  ];
};
