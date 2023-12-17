const model = require("../../../models/index");
const { getDay } = require("../../../utils/getDay");
const routerRoleRequest = require("../../../utils/routerRoleRequest");

const Class = model.Class;
module.exports = {
  index: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const classes = await Class.findAll({ include: model.User });
    classes.forEach((c) => {
      console.log(Object.assign({}, c.Users));
    });
    res.render("admin/classes/index", {
      req,
      routerRoleRequest,
      classes,
      success,
      error,
      getDay,
    });
  },
  addClass: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("admin/classes/add", {
      error,
      success,
      req,
      routerRoleRequest,
      getDay,
    });
  },
  handleAddClass: async (req, res) => {
    const {
      name,
      quantity,
      startDate,
      endDate,
      schedule,
      timeLearnStart,
      timeLearnEnd,
    } = req.body;

    if (
      !name ||
      !quantity ||
      !startDate ||
      !endDate ||
      !schedule ||
      !timeLearnStart ||
      !timeLearnEnd
    ) {
      req.flash("error", "Vui lòng nhập đầy đủ thông tin");
      res.redirect("/admin/manager/classes/add");
      return;
    }
    const timeLearn = timeLearnStart + "-" + timeLearnEnd;
    await Class.create({
      name,
      quantity,
      startDate,
      endDate,
      schedule,
      timeLearn,
    });
    req.flash("success", "Thêm thành công");
    res.redirect("/admin/manager/classes/add");
    return;
  },
  editClass: async (req, res) => {
    const { id } = req.params;
    const classInfo = await Class.findOne({ where: { id } });
    if (!classInfo) {
      req.flash("error", "Không tồn tại");
      res.redirect("/admin/manager/classes");
      return;
    }

    const success = req.flash("success");
    const error = req.flash("error");
    res.render("admin/classes/edit", {
      error,
      success,
      req,
      routerRoleRequest,
      classInfo,
      getDay,
    });
  },
  handleEditClass: async (req, res) => {
    const { id } = req.params;
    const {
      name,
      quantity,
      startDate,
      endDate,
      schedule,
      timeLearnStart,
      timeLearnEnd,
    } = req.body;

    if (
      !name ||
      !quantity ||
      !startDate ||
      !endDate ||
      !schedule ||
      !timeLearnStart ||
      !timeLearnEnd
    ) {
      req.flash("error", "Vui lòng nhập đầy đủ thông tin");
      res.redirect("/admin/manager/classes/edit/" + id);
      return;
    }
    const timeLearn = timeLearnStart + "-" + timeLearnEnd;
    await Class.update(
      {
        name,
        quantity,
        startDate,
        endDate,
        schedule,
        timeLearn,
      },
      { where: { id } }
    );
    req.flash("success", "Sửa thành công");
    res.redirect("/admin/manager/classes/edit/" + id);
  },
  deleteClass: async (req, res) => {
    const { id } = req.params;

    await Class.destroy({
      where: {
        id,
      },
    });
    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/classes");
  },
};
