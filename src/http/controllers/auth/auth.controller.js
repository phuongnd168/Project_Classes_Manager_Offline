const model = require("../../../models/index");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const routerRoleRequest = require("../../../utils/routerRoleRequest");
const sendMail = require("../../../utils/sendMail");
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
    res.render("auth/forgot-password", {
      layout: false,
      success,
      error,
    });
  },
  handleForgotPassword: async (req, res) => {
    const errors = validationResult(req);
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (errors.isEmpty()) {
      const token = TokenGenerator.generate();
      const subject = "Quên mật khẩu";
      const html =
        '<p>Click vào <a href="http://localhost:3000/auth/verify/' +
        token +
        '">link</a> để đặt lại mật khẩu. Link sẽ hết hạn sau 1 phút</p>';

      const info = sendMail(email, subject, html);
      if (info) {
        await TokenForgotPass.create({
          token: token,
          userId: user.id,
          expire: new Date(new Date().getTime() + 60000),
        });
        req.flash("success", "Vui lòng kiểm tra email để đặt lại mật khẩu");
      }
    } else {
      req.flash("error", errors.array());
    }
    res.redirect("/auth/forgot-password");
  },
  recoverPassword: async (req, res) => {
    const error = req.flash("error");
    const success = req.flash("success");

    res.render("auth/recover-password", { layout: false, error, success });
  },
  handleRecoverPassword: async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const hashPassword = bcrypt.hashSync(password, 10);
      const user = await TokenForgotPass.findOne({ where: { token } });
      await User.update(
        { password: hashPassword },
        { where: { id: user.userId } }
      );
      await TokenForgotPass.destroy({ where: { token } });
      req.flash("success", "Đặt lại mật khẩu thành công");
      res.redirect("/auth/login");
      return;
    } else {
      req.flash("error", errors.array());
      res.redirect("/auth/verify/" + token);
      return;
    }
  },
  otp: async (req, res) => {
    const error = req.flash("error");
    const success = req.flash("success");
    res.render("auth/otp", { layout: false, success, error });
  },
  handleOtp: async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await UserOTP.destroy({
        where: {
          userId: req.user.id,
        },
      });
      req.session.isVerify = true;
      delete req.session.sendOtp;
      res.redirect("/role");
      return;
    } else {
      req.flash("error", errors.array());
      res.redirect("/auth/otp");
      return;
    }
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
