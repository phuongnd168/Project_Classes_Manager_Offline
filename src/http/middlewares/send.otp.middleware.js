const nodemailer = require("nodemailer")
const model = require("../../models/index")
const UserOTP = model.user_otp
const otpGenerator = require('otp-generator')
module.exports = async (req, res, next) => {
    if(req.session.isVerify){
      next()
      return
    }
    if(req.user.userSocial){
      next()
      return
    }
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      });
    
      const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

      const info = await transporter.sendMail({
        from: `Phương ${process.env.MAIL_USERNAME}`,
        to: req.user.email, 
        subject: "Xác minh 2 bước",
        html: 'Mã OTP của bạn là ' + OTP + '. Mã sẽ hết hiệu lực sau 1 phút'
  
      })
      if(info){
        await UserOTP.create({
            otp: OTP,
            userId: req.user.id,
            expire: 60000
        })  
        req.flash("success", "Mã OTP đã được gửi về email, vui lòng kiểm tra để tiếp tục đăng nhập")
        res.redirect("/auth/otp")
      }
   
}