const routerRoleRequest = require("../../../utils/routerRoleRequest");
const model = require("../../../models/index");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const generator = require("generate-password");
const { getPaginateUrl } = require("../../../utils/getPaginateUrl");
const sendMail = require("../../../utils/sendMail");

const addClassStudentService = require("../../services/admin/students/addClass.student.service");
const getTeacherService = require("../../services/admin/teachers/getTeacher.service");
const addTeacherService = require("../../services/admin/teachers/addTeacher.service");
const updateTeacherService = require("../../services/admin/teachers/updateTeacher.service");
const destroyTeacherService = require("../../services/admin/teachers/destroyTeacher.service");
const getTimetableService = require("../../services/admin/teachers/getTimetable.service");
const filterTeacherService = require("../../services/admin/teachers/filterTeacher.service");

const User = model.User;
const Class = model.Class;
const Course = model.Course;
const StudentClass = model.students_class;
module.exports = {
  index: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const { keyword } = req.query;
    const { PER_PAGE } = process.env;

    const filters = await filterTeacherService(keyword)
    const totalCountObj = await User.findAndCountAll({
      where: filters,
    });

    const totalCount = totalCountObj.count;
    
    const totalPage = Math.ceil(totalCount / PER_PAGE);

    let { page } = req.query;
    if (!page || page < 1 || page > totalPage) {
      page = 1;
    }
    const offset = (page - 1) * PER_PAGE;
    
    const teachers = await getTeacherService(filters, +PER_PAGE, offset);

    res.render("admin/teachers/index", {
      req,
      routerRoleRequest,

      teachers,
      getPaginateUrl,
      success,
      error,
      totalPage,
      page,
      offset,
    });
  },
  addTeacher: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");

    res.render("admin/teachers/add", {
      error,
      success,
      req,
      routerRoleRequest,
    });
  },
  handleAddTeacher: async (req, res) => {
    const { name, email, phone, address, typeId } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const password = generator.generate({
        length: 10,
        numbers: true,
      });

      const hash = bcrypt.hashSync(password, 10);
      const subject = "Mật khẩu người dùng";
      const html = `<p>Mật khẩu của bạn là ${password}. Vui lòng đăng nhập để đổi mật khẩu</p>`;

      const info = sendMail(email, subject, html);

      if (info) {
        addTeacherService({
          name,
          email,
          phone,
          address,
          typeId,
          password: hash,
        });

        req.flash(
          "success",
          "Thêm thành công, mật khẩu đã được gửi qua email. Vui lòng đăng nhập để đổi mật khẩu"
        );
      }
    } else {
      req.flash("error", errors.array());
    }

    res.redirect("/admin/manager/teachers/add");
  },
  editTeacher: async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("admin/teachers/edit", {
      error,
      success,
      req,
      routerRoleRequest,
      user,
    });
  },
  handleEditTeacher: async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, typeId } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      updateTeacherService({ name, email, phone, address, typeId }, id);

      req.flash("success", "Sửa thành công");
    } else {
      req.flash("error", errors.array());
    }
    res.redirect("/admin/manager/teachers/edit/" + id);
  },
  deleteTeacher: async (req, res) => {
    const { id } = req.params;
    destroyTeacherService(id);
    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/teachers");
  },
  timetable: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const { id } = req.params;
  
    const timetable = await getTimetableService(+id)

    
    res.render("admin/teachers/timetable", 
    { error,
      success,
      timetable,
      req,
      routerRoleRequest
    })
  }
};
