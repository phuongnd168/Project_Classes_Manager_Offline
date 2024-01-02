const model = require("../../models/index");
const TokenForgotPass = model.token_forgot_pass;
module.exports = async (req, res, next) => {
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
  if (verify.expire < new Date().getTime()) {
    req.flash("error", "Token đã hết hạn");
    res.redirect("/auth/login");
    return;
  }
  next();
};
