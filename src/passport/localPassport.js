const LocalStrategy = require("passport-local").Strategy;
const model = require("../models/index");
const bcrypt = require("bcrypt");
const emailValidate = require("../utils/emailValidate");
const sendOtpMiddleware = require("../http/middlewares/send.otp.middleware");

const User = model.User;
module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async function (email, password, done) {
    if (!emailValidate(email)) {
      done(null, false, {
        message: "Email không đúng định dạng",
      });
      return;
    }
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      done(null, false, { message: "Sai email hoặc mật khẩu" });
      return;
    }
    if (!user.password) {
      done(null, false, { message: "Sai email hoặc mật khẩu" });
      return;
    }
    const pass = bcrypt.compareSync(password, user.password);
    if (!pass) {
      done(null, false, { message: "Sai email hoặc mật khẩu" });
      return;
    }

    done(null, user);
  }
);
