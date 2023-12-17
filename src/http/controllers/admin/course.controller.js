const model = require("../../../models/index");
const { Op } = require("sequelize");
const routerRoleRequest = require("../../../utils/routerRoleRequest");
const { getPaginateUrl } = require("../../../utils/getPaginateUrl");
const Course = model.Course;
const User = model.User;
module.exports = {
  index: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const { keyword } = req.query;
    const { PER_PAGE } = process.env;
    let filters = {};
    if (keyword) {
      filters = [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
    }

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

    const courses = await Course.findAll({
      where: filters,
      limit: +PER_PAGE,
      offset: offset,
    });

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
    const { name, price, teacher, tryLearn, quantity, duration } = req.body;

    if (!name || !price || !quantity || !duration) {
      req.flash("error", "Vui lòng nhập đầy đủ thông tin");
      res.redirect("/admin/manager/courses/add");
      return;
    }

    await Course.create({
      name,
      price,
      teacherId: teacher,
      tryLearn,
      quantity,
      duration,
    });
    req.flash("success", "Thêm thành công");
    res.redirect("/admin/manager/courses/add");
    return;
  },
  editCourse: async (req, res) => {
    const { id } = req.params;
    const course = await Course.findOne({ where: { id }, include: User });
    if (!course) {
      req.flash("error", "Không tồn tại");
      res.redirect("/admin/manager/courses");
      return;
    }
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
    const { id } = req.params;
    const { name, price, teacher, tryLearn, quantity, duration } = req.body;
    if (!name || !price || !quantity || !duration) {
      req.flash("error", "Vui lòng nhập đầy đủ thông tin");
      res.redirect("/admin/manager/courses/add");
      return;
    }
    await Course.update(
      { name, price, teacherId: teacher, tryLearn, quantity, duration },
      { where: { id } }
    );
    req.flash("success", "Sửa thành công");
    res.redirect("/admin/manager/courses/edit/" + id);
  },
  deleteCourse: async (req, res) => {
    const { id } = req.params;

    await Course.destroy({
      where: {
        id,
      },
    });
    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/courses");
  },
};
