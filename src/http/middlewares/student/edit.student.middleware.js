const model = require("../../../models/index");
const User = model.User;
module.exports = async (req, res, next) => {

  
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    req.flash("error", "Không tồn tại");
    res.redirect("/teacher/manager/students");
    return;
  }
  next();
};
