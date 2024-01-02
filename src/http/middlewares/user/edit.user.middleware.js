const model = require("../../../models/index");
const User = model.User;
module.exports = async (req, res, next) => {
  const url = req.originalUrl
  
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user && url.includes("users")) {
    req.flash("error", "Không tồn tại");
    res.redirect("/admin/manager/users");
    return;
  }
  if (!user && url.includes("students")) {
    req.flash("error", "Không tồn tại");
    res.redirect("/admin/manager/students");
    return;
  }
  next();
};
