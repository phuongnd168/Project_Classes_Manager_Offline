const LocalStrategy = require("passport-local").Strategy;
const model = require("../models/index");
const bcrypt = require("bcrypt");
const emailValidate = require("../utils/emailValidate");


const User = model.User;
module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback:true
  },
  async function (req, email, password, done) {
    
    if (!emailValidate(email)) {
      req.flash("email", email)
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
      req.flash("email", email)
      done(null, false, { message: "Sai email hoặc mật khẩu" });
      return;
    }
    if (!user.password) {
      req.flash("email", email)
      done(null, false, { message: "Sai email hoặc mật khẩu" });
      return;
    }
    const pass = bcrypt.compareSync(password, user.password);
    if (!pass) {
      req.flash("email", email)
      done(null, false, { message: "Sai email hoặc mật khẩu" });
      return;
    }
    if(user.typeId === 4){
      done(null, false, { message: "Chức năng trợ giảng sẽ sớm ra mắt" });
      return;
    }
    done(null, user);
  }
);
