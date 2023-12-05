const FacebookStrategy = require('passport-facebook');
const model = require("../models/index");
const { Op } = require("sequelize");
const User = model.User
const UserSocial = model.user_social;
module.exports = new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      state: true,
      passReqToCallback: true,
      profileFields: ['id', 'emails', 'name'] 
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const { _json, provider } = profile;
      const {id} = _json
      let userFacebook = await UserSocial.findOne({
        where: {
          [Op.and]: [{ providerId: id }, { provider: provider }],
        },
      });
      if(!req?.user){
        if(!userFacebook){
          return done(null, false, {message: "Tài khoản này chưa được liên kết tới người dùng nào"})
        }
        return done(null, userFacebook);
      }
      req.session.status = "connect"
      if(!userFacebook){
        userFacebook = await UserSocial.create({
          userId: req.user.id,
          provider: provider,
          providerId: id
        })
        return done(null, userFacebook, {message: "Liên kết thành công"});
      }

      return done(null, false, {message: "Tài khoản đã được liên kết với người dùng khác"});
      
    }
  );