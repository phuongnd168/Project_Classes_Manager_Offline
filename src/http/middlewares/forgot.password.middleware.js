const { check } = require("express-validator");
const model = require("../../models/index");
const User = model.User;
module.exports = () => {
  return [
    check("email", "Vui lòng nhập email").notEmpty(),
    check("email", "Email không đúng định dạng").isEmail(),
    check("email").custom(async (emailValue, { req }) => {
      const user = await User.findOne({
        where: {
          email: emailValue,
        },
      });
      if (!user) {
        throw new Error("Email không tồn tại");
      }
    }),
  ];
};
