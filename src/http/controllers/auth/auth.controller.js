const model = require("../../../models/index");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const emailValidate = require("../../../utils/emailValidate");
const routerRoleRequest = require("../../../utils/routerRoleRequest");
var TokenGenerator = require("token-generator")({
  salt: "F8-Project-Classes-Manager",
  timestampMap: "F8-Backend",
});

const UserSocial = model.user_social;
const User = model.User;
const UserOTP = model.user_otp;
const TokenForgotPass = model.token_forgot_pass;
const LoginToken = model.login_token;
module.exports = {
  login: async (req, res) => {
    const error = req.flash("error");
    const success = req.flash("success");
    if (error[0] === "Missing credentials") {
      error[0] = "Vui lòng điền đầy đủ thông tin";
    }
    res.render("auth/login", {
      layout: "layouts/auth.layout.ejs",
      error,
      success,
    });
  },
  forgotPassword: async (req, res) => {
    const error = req.flash("error");
    const success = req.flash("success");
    res.render("auth/forgot-password", { layout: false, success, error });
  },
  handleForgotPassword: async (req, res) => {
    const { email } = req.body;
    if (!email) {
      req.flash("error", "Vui lòng nhập email");
      res.redirect("/auth/forgot-password");
      return;
    }
    const isEmail = emailValidate(email);
    if (!isEmail) {
      req.flash("error", "Vui lòng nhập email đúng định dạng");
      res.redirect("/auth/forgot-password");
      return;
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      req.flash("error", "Email không tồn tại");
      res.redirect("/auth/forgot-password");
      return;
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

    const token = TokenGenerator.generate();

    const info = await transporter.sendMail({
      from: `Phương ${process.env.MAIL_USERNAME}`,
      to: email,
      subject: "Quên mật khẩu",
      html:
        '<p>Click vào <a href="http://localhost:3000/auth/verify/' +
        token +
        '">link</a> để đặt lại mật khẩu. Link sẽ hết hạn sau 1 phút</p>',
    });
    if (info) {
      await TokenForgotPass.create({
        token: token,
        userId: user.id,
        expire: new Date(new Date().getTime() + 60000),
      });
      req.flash("success", "Vui lòng kiểm tra email để đặt lại mật khẩu");
      res.redirect("/auth/forgot-password");
      return;
    }
    req.flash("error", "Gửi mail không thành công");
    res.redirect("/auth/forgot-password");
  },
  recoverPassword: async (req, res) => {
    const error = req.flash("error");
    const success = req.flash("success");
    const { token } = req.params;
    if (!token) {
      res.redirect("/auth/login");
      return;
    }
    const verify = await TokenForgotPass.findOne({
      where: {
        token,
      },
    });
    if (!verify) {
      res.redirect("/auth/login");
      return;
    }

    res.render("auth/recover-password", { layout: false, error, success });
  },
  handleRecoverPassword: async (req, res) => {
    const { token } = req.params;
    const { password, password2 } = req.body;
    if (!password || !password2) {
      req.flash("error", "Vui lòng nhập đầy đủ thông tin");
      res.redirect("/auth/verify/" + token);
      return;
    }
    if (password !== password2) {
      req.flash("error", "Mật khẩu không trùng khớp");
      res.redirect("/auth/verify/" + token);
      return;
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await TokenForgotPass.findOne({ where: { token } });
    await User.update(
      { password: hashPassword },
      { where: { id: user.userId } }
    );
    await TokenForgotPass.destroy({ where: { token } });
    req.flash("success", "Đặt lại mật khẩu thành công");
    res.redirect("/auth/login");
  },
  otp: async (req, res) => {
    const error = req.flash("error");
    const success = req.flash("success");

    res.render("auth/otp", { layout: false, success, error });
  },
  handleOtp: async (req, res) => {
    const { otp } = req.body;
    if (!otp) {
      req.flash("error", "Vui lòng nhập mã otp");
      res.redirect("/auth/otp");
      return;
    }
    const isVerify = await UserOTP.findOne({
      where: {
        [Op.and]: [{ userId: req.user.id }, { otp }],
      },
    });
    if (!isVerify) {
      req.flash("error", "Mã otp không chính xác");
      res.redirect("/auth/otp");
      return;
    }
    await UserOTP.destroy({
      where: {
        userId: req.user.id,
      },
    });
    req.session.isVerify = true;
    res.redirect("/role");
  },
  logout: async (req, res) => {
    if (req.user) {
      await LoginToken.destroy({ where: { userId: req.user.id } });
    }
    req.logout();
    delete req.session.isVerify;
    res.clearCookie("user");
    res.redirect("/auth/login");
  },
  cancelConnectSocial: async (req, res) => {
    const redirect = routerRoleRequest(req) + "/account";
    const { social } = req.query;
    if (!social) {
      req.flash("error", "Không xác định được mạng xã hộ cần xóa");
      res.redirect(redirect);
      return;
    }
    await UserSocial.destroy({
      where: {
        [Op.and]: [{ userId: req.user.id }, { provider: social }],
      },
    });

    req.flash("success", "Hủy liên kết thành công");
    res.redirect(redirect);
  },
};
