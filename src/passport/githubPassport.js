var GitHubStrategy = require('passport-github2').Strategy;
const model = require("../models/index");
const { Op } = require("sequelize");
const UserSocial = model.user_social;
const User = model.User
module.exports = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ["user:email"],
    passReqToCallback: true,
  },
  async function(req, accessToken, refreshToken, profile, done) {

    const {id, provider} = profile
    let userGithub = await UserSocial.findOne({
      where: {
        [Op.and]: [{ providerId: id }, { provider: provider }],
      },
    });
    if(!req?.user){
      if(!userGithub){
        return done(null, false, {message: "Tài khoản này chưa được liên kết"})
      }
      return done(null, userGithub);
    }
    req.session.status = "connect"
    if(!userGithub){
      userGithub = await UserSocial.create({
        userId: req.user.id,
        provider: provider,
        providerId: id
      })
      return done(null, userGithub,  req.flash("success", "Liên kết thành công"));
    }
    return done(null, false, {message: "Tài khoản đã được liên kết với người dùng khác"});
    
  }
);