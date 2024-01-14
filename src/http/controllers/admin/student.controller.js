const routerRoleRequest = require("../../../utils/routerRoleRequest");
const model = require("../../../models/index");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const generator = require("generate-password");
const { getPaginateUrl } = require("../../../utils/getPaginateUrl");
const sendMail = require("../../../utils/sendMail");
const addUserService = require("../../services/admin/users/addUser.service");
const updateUserService = require("../../services/admin/users/updateUser.service");
const destroyUserService = require("../../services/admin/users/destroyUser.service");
const getStudentService = require("../../services/admin/students/getStudent.service");
const addClassStudentService = require("../../services/admin/students/addClass.student.service");
const filterStudentService = require("../../services/admin/students/filterStudent.service");

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

  
    const filters = await filterStudentService(keyword)
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
    const students = await getStudentService(filters, +PER_PAGE, offset);
    const className = {}
    const courseName = {}
    students.map(async (student) => {
      if(student?.students_classes?.length){
          student.students_classes.map(async(s) => {
          
            if(className.hasOwnProperty(s.studentId.toString())){   
              
              return className[s.studentId] =  [className[s.studentId], " "+ s.Class.name]
            }
      
            return className[s.studentId] =  s.Class.name
        })
      }
    })
  
    res.render("admin/students/index", {
      req,
      routerRoleRequest,
      className,
      courseName,
      students,
      getPaginateUrl,
      success,
      error,
      totalPage,
      page,
      offset,
    });
  },
  addStudent: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");

    res.render("admin/students/add", {
      error,
      success,
      req,
      routerRoleRequest,
    });
  },
  handleAddStudent: async (req, res) => {
    const { name, email, phone, address } = req.body;
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
        addUserService({
          name,
          email,
          phone,
          address,
          typeId: 3,
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

    res.redirect("/admin/manager/students/add");
  },
  editStudent: async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    const success = req.flash("success");
    const error = req.flash("error");
    res.render("admin/students/edit", {
      error,
      success,
      req,
      routerRoleRequest,
      user,
    });
  },
  handleEditStudent: async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      updateUserService({ name, email, phone, address }, id);

      req.flash("success", "Sửa thành công");
    } else {
      req.flash("error", errors.array());
    }
    res.redirect("/admin/manager/students/edit/" + id);
  },
  deleteStudent: async (req, res) => {
    const { id } = req.params;
    destroyUserService(id);
    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/students");
  },
  addClass: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const {id} = req.params
    let classData = await Class.findAll({include:[{model: StudentClass, where: {studentId: +id}}] })
    const addClass = classData.map(c => c.id);
    classData = await Class.findAll({
      where:{
        id: {[Op.notIn]: addClass}
      }
    })
    res.render("admin/students/add-class", { 
      classData,
      success,
      error,
      id,
      req, 
      routerRoleRequest
    })
  },
  handleAddClass: async (req, res) => {
    const {id} = req.params
    const {classes} = req.body
    addClassStudentService(classes, id)
    req.flash("success", "Thêm thành công");
    res.redirect("/admin/manager/students")
  }
};
