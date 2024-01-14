const model = require("../../../models/index");
const { getDay } = require("../../../utils/getDay");
const routerRoleRequest = require("../../../utils/routerRoleRequest");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const { getPaginateUrl } = require("../../../utils/getPaginateUrl");
const excel = require("excel4node");
const addClassService = require("../../services/admin/classes/addClass.service");
const destroyClassService = require("../../services/admin/classes/destroyClass.service");
const updateClassService = require("../../services/admin/classes/updateClass.service");
const getClassService = require("../../services/admin/classes/getClass.service");
const filterClassService = require("../../services/admin/classes/filterClass.service");
let c = null;
const Class = model.Class;
const User = model.User;
const Course = model.Course;
const ClassSchedule = model.classes_schedule;
module.exports = {
  index: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const { keyword } = req.query;
    const { PER_PAGE } = process.env;
    const filters = await filterClassService(keyword)

    const totalCountObj = await Class.findAndCountAll({
      where: filters,
    });

    const totalCount = totalCountObj.count;

    const totalPage = Math.ceil(totalCount / PER_PAGE);

    let { page } = req.query;
    if (!page || page < 1 || page > totalPage) {
      page = 1;
    }

    const offset = (page - 1) * PER_PAGE;
    const classes = await getClassService(filters, +PER_PAGE, offset);
  
    res.render("admin/classes/index", {
      req,
      routerRoleRequest,
      classes,
      success,
      error,
      getPaginateUrl,
      totalPage,
      page,
      offset,
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
    const courses = await Course.findAll()
    res.render("admin/classes/add", {
      courses,
      error,
      success,
      req,
      routerRoleRequest,
      getDay,
      teachers,
    });
  },
  handleAddClass: async (req, res) => {
    const errors = validationResult(req);
    const {
      name,
      quantity,
      teacher,
      startDate,
      endDate,
      schedule,
      timeLearnStart,
      timeLearnEnd,
      course
    } = req.body;
  
    const timeLearn = timeLearnStart + "-" + timeLearnEnd;
    if (errors.isEmpty()) {
      addClassService(
        {
          name,
          quantity,
          startDate,
          endDate,
          timeLearn,
          courseId: course
        },
        teacher,
        schedule,
        startDate,
        endDate,
        timeLearnStart
      );

      req.flash("success", "Thêm thành công");
    } else {
      req.flash("error", errors.array());
    }
    res.redirect("/admin/manager/classes/add");
  },
  editClass: async (req, res) => {
    const { id } = req.params;
    const classInfo = await Class.findOne({ where: { id },  include: [{ model: User }, { model: ClassSchedule }, {model: Course}]});
    const course = await Course.findAll({
      where: {
         id: { [Op.ne]: classInfo?.Course?.id ?? "" } 
    },})
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
      course,
      routerRoleRequest,
      classInfo,
      getDay,
      teachers,
    });
  },
  handleEditClass: async (req, res) => {
    const errors = validationResult(req);
    const { id } = req.params;
    const {
      teacher,
      name,
      quantity,
      startDate,
      endDate,
      schedule,
      course,
      timeLearnStart,
      timeLearnEnd,
    } = req.body;

    const timeLearn = timeLearnStart + "-" + timeLearnEnd;
    if (errors.isEmpty()) {
      updateClassService(
        {
          name,
          quantity,
          startDate,
          endDate,
          timeLearn,
          courseId: course
        },
        id,
        teacher,
        schedule,
        startDate,
        endDate,
        timeLearnStart
      );
      req.flash("success", "Sửa thành công");
    } else {
      req.flash("error", errors.array());
    }
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
