const model = require("../../../models/index");
const User = model.User;
const {Op} = require("sequelize")
module.exports = async (req, res, next) => {
  const url = req.originalUrl
  
  const { id } = req.params;
  const admin = await User.findOne({ where: {[Op.and]: [{id}, {typeId: 1}]} });
  const teacher = await User.findOne({ where: {[Op.and]: [{id}, {typeId: 2}]} });
  const student = await User.findOne({ where: {[Op.and]: [{id}, {typeId: 3}]} });
  if (!admin && url.includes("users")) {
    req.flash("error", "Không tồn tại");
    res.redirect("/admin/manager/users");
    return;
  }
  if (!student && url.includes("students")) {
    req.flash("error", "Không tồn tại");
    res.redirect("/admin/manager/students");
    return;
  }
  if (!teacher && url.includes("teachers")) {
    req.flash("error", "Không tồn tại");
    res.redirect("/admin/manager/teachers");
    return;
  }
  next();
};
