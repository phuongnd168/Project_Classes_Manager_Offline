const model = require("../../../models/index");
const Class = model.Class;
module.exports = async (req, res, next) => {
  const { id } = req.params;
  const classInfo = await Class.findOne({ where: { id } });
  if (!classInfo) {
    req.flash("error", "Không tồn tại");
    res.redirect("/admin/manager/classes");
    return;
  }

  next();
};
