const model = require("../../models/index");
var TokenGenerator = require("token-generator")({
  salt: "F8-Project-Classes-Manager",
  timestampMap: "F8-Backend",
});
const LoginToken = model.login_token;
module.exports = async (req, res, next) => {
  const loginToken = await LoginToken.findOne({
    where: {
      userId: req.user.id,
    },
  });
  const token = TokenGenerator.generate();
  if (!loginToken) {
    await LoginToken.create({
      userId: req.user.id,
      token: token,
    });
    res.cookie("user", token, { maxAge: 3600000, httpOnly: true });
  }
  if (!req.cookies?.user) {
    await LoginToken.update(
      {
        token: token,
      },
      {
        where: {
          userId: req.user.id,
        },
      }
    );
    res.cookie("user", token, { maxAge: 3600000, httpOnly: true });
  }
  if (req.cookies?.user && req.cookies?.user !== loginToken?.token) {
    req.logout();
    delete req.session.isVerify;
    res.clearCookie("user");
    res.redirect("/auth/login");

    return;
  }

  next();
};
