const model = require("../../../models/index");
const Course = model.Course;
module.exports = async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findOne({
    where: { id },
  });
  if (!course) {
    req.flash("error", "Không tồn tại");
    res.redirect("/admin/manager/courses");
    return;
  }

  next();
};
