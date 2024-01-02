const { check } = require("express-validator");
const model = require("../../models/index");
const { Op } = require("sequelize");
const UserOTP = model.user_otp;

module.exports = () => {
  return [
    check("otp", "Mã OTP bắt buộc phải nhập").notEmpty(),

    check("otp").custom(async (otpValue, { req }) => {
      const isVerify = await UserOTP.findOne({
        where: {
          [Op.and]: [{ userId: req.user.id }, { otp: otpValue }],
        },
      });
      if (!isVerify) {
        throw new Error("Mã otp không chính xác");
      }
      if (isVerify.expire < new Date().getTime()) {
        throw new Error("Mã otp đã hết hạn");
      }
    }),
  ];
};
