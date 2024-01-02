const nodemailer = require("nodemailer");
const model = require("../../models/index");
const UserOTP = model.user_otp;
const otpGenerator = require("otp-generator");
const sendMail = require("../../utils/sendMail");
module.exports = async (req, res, next) => {
  if (req.session.isVerify) {
    next();
    return;
  }
  if (req.user.userSocial) {
    next();
    return;
  }
  if (!req.session.sendOtp) {
    const OTP = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const { email, id } = req.user;
    const subject = "Xác minh 2 bước";
    const html = "Mã OTP của bạn là " + OTP + ". Mã sẽ hết hiệu lực sau 1 phút";
    const info = sendMail(email, subject, html);

    if (info) {
      await UserOTP.create({
        otp: OTP,
        userId: id,
        expire: new Date(new Date().getTime() + 60000),
      });
      req.flash(
        "success",
        "Mã OTP đã được gửi về email, vui lòng kiểm tra để tiếp tục đăng nhập"
      );
      req.session.sendOtp = true;
    }
  }

  res.redirect("/auth/otp");
  return;
};
