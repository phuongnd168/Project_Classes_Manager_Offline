const routerRoleRequest = require("../../utils/routerRoleRequest");

module.exports = (req, res, next) => {
  if (req.session.firstLogin || req.user.firstLogin) {
    const redirect = routerRoleRequest(req) + "/";

    return res.redirect(redirect);
  }
  next();
};
