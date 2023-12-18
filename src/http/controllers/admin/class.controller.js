const model = require("../../../models/index");
const { getDay } = require("../../../utils/getDay");
const routerRoleRequest = require("../../../utils/routerRoleRequest");
const { Op } = require("sequelize");
const Class = model.Class;
const User = model.User;
module.exports = {
  index: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const classes = await Class.findAll({ include: model.User });

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
    const teachers = await User.findAll({
      where: {
        typeId: 2,
      },
    });
    res.render("admin/classes/add", {
      error,
      success,
      req,
      routerRoleRequest,
      getDay,
      teachers,
    });
  },
  handleAddClass: async (req, res) => {
    const {
      name,
      quantity,
      teacher,
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

    const newClass = await Class.create({
      name,
      quantity,
      startDate,
      endDate,
      schedule,
      timeLearn,
    });
    newClass.addUser(await User.findOne({ where: { id: teacher } }));
    req.flash("success", "Thêm thành công");
    res.redirect("/admin/manager/classes/add");
    return;
  },
  editClass: async (req, res) => {
    const { id } = req.params;
    const classInfo = await Class.findOne({ where: { id }, include: User });
    if (!classInfo) {
      req.flash("error", "Không tồn tại");
      res.redirect("/admin/manager/classes");
      return;
    }

    const teachers = await User.findAll({
      where: {
        [Op.and]: [
          { typeId: 2 },
          { id: { [Op.ne]: classInfo.Users["0"]?.id ?? "" } },
        ],
      },
    });
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("admin/classes/edit", {
      error,
      success,
      req,
      routerRoleRequest,
      classInfo,
      getDay,
      teachers,
    });
  },
  handleEditClass: async (req, res) => {
    const { id } = req.params;
    const {
      teacher,
      name,
      quantity,
      startDate,
      endDate,
      schedule,
      timeLearnStart,
      timeLearnEnd,
    } = req.body;
    console.log(req.body);
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
    const classUpdate = await Class.findOne({ where: { id } });
    classUpdate.setUsers(await User.findOne({ where: { id: teacher } }));
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
