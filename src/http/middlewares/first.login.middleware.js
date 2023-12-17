const routerRoleRequest = require("../../utils/routerRoleRequest");
const model = require("../../models/index");
module.exports = async (req, res, next) => {
  const user = await model.User.findOne({
    where: {
      id: req.user.id,
    },
  });
  if (!user.firstLogin) {
    const redirect = routerRoleRequest(req) + "/account/reset-password";

    return res.redirect(redirect);
  }

  next();
};
