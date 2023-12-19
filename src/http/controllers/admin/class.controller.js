const model = require("../../../models/index");
const { getDay } = require("../../../utils/getDay");
const routerRoleRequest = require("../../../utils/routerRoleRequest");
const { Op } = require("sequelize");
const excel = require("excel4node");
const addClassService = require("../../services/admin/classes/addClass.service");
const destroyClassService = require("../../services/admin/classes/destroyClass.service");
const updateClassService = require("../../services/admin/classes/updateClass.service");
const getClassService = require("../../services/admin/classes/getClass.service");

const Class = model.Class;
const User = model.User;
module.exports = {
  index: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const classes = await getClassService();

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
    addClassService(
      {
        name,
        quantity,
        startDate,
        endDate,
        schedule,
        timeLearn,
      },
      teacher
    );

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
    updateClassService(
      {
        name,
        quantity,
        startDate,
        endDate,
        schedule,
        timeLearn,
      },
      id,
      teacher
    );
    req.flash("success", "Sửa thành công");
    res.redirect("/admin/manager/classes/edit/" + id);
  },
  deleteClass: async (req, res) => {
    const { id } = req.params;
    destroyClassService(id);

    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/classes");
  },
  exportClass: async (req, res) => {
    const workbook = new excel.Workbook();
    var worksheet = workbook.addWorksheet("Sheet 1");
    const classes = await Class.findAll({ include: User });
    var style = workbook.createStyle({
      font: {
        color: "#000101",
        size: 12,
      },
    });
    worksheet.cell(1, 1).string("Tên lớp học").style(style);
    worksheet.cell(1, 2).string("Sĩ số").style(style);
    worksheet.cell(1, 3).string("Ngày khai giảng").style(style);
    worksheet.cell(1, 4).string("Ngày bế giảng").style(style);
    worksheet.cell(1, 5).string("Lịch học").style(style);
    worksheet.cell(1, 6).string("Thời gian học").style(style);
    worksheet.cell(1, 7).string("Giảng viên").style(style);
    classes.forEach((c, index) => {
      worksheet
        .cell(index + 2, 1)
        .string(c.name)
        .style(style);
      worksheet
        .cell(index + 2, 2)
        .number(c.quantity)
        .style(style);
      worksheet
        .cell(index + 2, 3)
        .string(c.startDate)
        .style(style);
      worksheet
        .cell(index + 2, 4)
        .string(c.endDate)
        .style(style);
      worksheet
        .cell(index + 2, 5)
        .string(getDay(c.schedule))
        .style(style);
      worksheet
        .cell(index + 2, 6)
        .string(c.timeLearn)
        .style(style);
      worksheet
        .cell(index + 2, 7)
        .string(Object.assign({}, c.Users)["0"]?.name)
        .style(style);
      index++;
    });

    workbook.write("Danh_sach_lop_hoc.xlsx", res);
    return;
  },
};
