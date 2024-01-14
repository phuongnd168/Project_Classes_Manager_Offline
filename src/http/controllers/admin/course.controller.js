const model = require("../../../models/index");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const routerRoleRequest = require("../../../utils/routerRoleRequest");
const { getPaginateUrl } = require("../../../utils/getPaginateUrl");
const getCourseService = require("../../services/admin/courses/getCourse.service");
const addCourseService = require("../../services/admin/courses/addCourse.service");
const destroyCourseService = require("../../services/admin/courses/destroyCourse.service");
const updateCourseService = require("../../services/admin/courses/updateCourse.service");
const filterCourseService = require("../../services/admin/courses/filterCourse.service");
const Course = model.Course;
const User = model.User;
module.exports = {
  index: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const { keyword } = req.query;
    const { PER_PAGE } = process.env;
    
    const filters = await filterCourseService(keyword)
    const totalCountObj = await Course.findAndCountAll({
      where: filters,
    });

    const totalCount = totalCountObj.count;

    const totalPage = Math.ceil(totalCount / PER_PAGE);

    let { page } = req.query;
    if (!page || page < 1 || page > totalPage) {
      page = 1;
    }

    const offset = (page - 1) * PER_PAGE;
    const courses = await getCourseService(filters, +PER_PAGE, offset);

    res.render("admin/courses/index", {
      req,
      getPaginateUrl,
      page,
      totalPage,
      routerRoleRequest,
      courses,
      success,
      error,
      offset,
    });
  },
  addCourse: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const teachers = await User.findAll({
      where: {
        typeId: 2,
      },
    });
    res.render("admin/courses/add", {
      error,
      success,
      teachers,
      req,
      routerRoleRequest,
    });
  },
  handleAddCourse: async (req, res) => {
    const errors = validationResult(req);
    const { name, price, teacher, quantity, duration, numberOfSessions } = req.body;
    if (errors.isEmpty()) {
      addCourseService({
        name,
        price,
        teacherId: teacher,
        tryLearn: numberOfSessions ? numberOfSessions : 0,
        quantity,
        duration,
      });

      req.flash("success", "Thêm thành công");
    } else {
      req.flash("error", errors.array());
    }
    res.redirect("/admin/manager/courses/add");
  },
  editCourse: async (req, res) => {
    const { id } = req.params;
    const course = await Course.findOne({ where: { id }, include: User });

    const teachers = await User.findAll({
      where: {
        [Op.and]: [
          { typeId: 2 },
          {
            id: {
              [Op.ne]: course.User.id,
            },
          },
        ],
      },
    });

    const success = req.flash("success");
    const error = req.flash("error");
    res.render("admin/courses/edit", {
      error,
      success,
      req,
      routerRoleRequest,
      course,
      teachers,
    });
  },
  handleEditCourse: async (req, res) => {
    const errors = validationResult(req);
    const { id } = req.params;
    const { name, price, teacher, tryLearn, numberOfSessions, quantity, duration } = req.body;
    
    if (errors.isEmpty()) {
      updateCourseService(
        { name, price, teacherId: teacher, tryLearn: +tryLearn ? numberOfSessions : 0, quantity, duration },
        id
      );

      req.flash("success", "Sửa thành công");
    } else {
      req.flash("error", errors.array());
    }
    res.redirect("/admin/manager/courses/edit/" + id);
  },

  deleteCourse: async (req, res) => {
    const { id } = req.params;
    destroyCourseService(id);

    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/courses");
  },
};
