//Xử lý đăng nhập thông qua mạng xã hội
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const model = require("../models/index");
const { Op } = require("sequelize");
const UserSocial = model.user_social;
const User = model.User;

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    const { id, provider } = profile;
    let userGoogle = await UserSocial.findOne({
      where: {
        [Op.and]: [{ providerId: id }, { provider: provider }],
      },
    });
    if (!req?.user) {
      if (!userGoogle) {
        return done(null, false, {
          message:
            "Tài khoản mạng xã hội này chưa được liên kết tới người dùng nào",
        });
      }
      return done(null, userGoogle);
    }
    req.session.status = "connect";
    if (!userGoogle) {
      userGoogle = await UserSocial.create({
        userId: req.user.id,
        provider: provider,
        providerId: id,
      });

      return done(
        null,
        userGoogle,
        req.flash("success", "Liên kết thành công")
      );
    }

    return done(null, false, {
      message: "Tài khoản mạng xã hội này đã được liên kết với người dùng khác",
    });
  }
);
