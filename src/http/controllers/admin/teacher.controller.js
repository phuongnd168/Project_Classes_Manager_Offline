const routerRoleRequest = require("../../../utils/routerRoleRequest");
const model = require("../../../models/index");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const generator = require("generate-password");
const { getPaginateUrl } = require("../../../utils/getPaginateUrl");
const sendMail = require("../../../utils/sendMail");
const Excel = require('exceljs');
const getTeacherService = require("../../services/admin/teachers/getTeacher.service");
const addTeacherService = require("../../services/admin/teachers/addTeacher.service");
const updateTeacherService = require("../../services/admin/teachers/updateTeacher.service");
const destroyTeacherService = require("../../services/admin/teachers/destroyTeacher.service");
const getTimetableService = require("../../services/admin/teachers/getTimetable.service");
const filterTeacherService = require("../../services/admin/teachers/filterTeacher.service");
const exportExcel = require("../../../utils/exportExcel");
const getUserService = require("../../services/role/getUser.service");
let data = null
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
    data = teachers
    const user = await getUserService(req.user.id)
    res.render("admin/teachers/index", {
      req,
      routerRoleRequest,
      user,
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
    const user = await getUserService(req.user.id)
    res.render("admin/teachers/add", {
      user,
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
    const userInfo = await User.findOne({ where: { id } });
    const success = req.flash("success");
    const error = req.flash("error");
    const user = await getUserService(req.user.id)
    res.render("admin/teachers/edit", {
      userInfo,
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
    const user = await getUserService(req.user.id)
    const timetable = await getTimetableService(+id)

    
    res.render("admin/teachers/timetable", 
    { user,
      error,
      success,
      timetable,
      req,
      routerRoleRequest
    })
  },
  deleteAll: async(req, res) => {
    const {id} = req.body
    const data = id.split(",")
    data.forEach((id) => {
      destroyTeacherService(id)
    });
    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/teachers");
  },
  importExcel: async(req, res) => {
  
    const workbook = new Excel.Workbook();
    const files = req.files['myFiles']

    files.forEach(file => {
      workbook.xlsx.readFile('./public/uploads/' + file.filename )
      .then(function() {
        ws = workbook.getWorksheet(1)
        ws.eachRow({ includeEmpty: false }, async function(row, rowNumber) {
          if(rowNumber !== 1){
            const [empty, email, name, phone, address, typeId] = row.values;
            const data = { email: email.text, name, phone, address, typeId };
    
            try {
              const password = generator.generate({
                length: 10,
                numbers: true,
              });
        
              const hash = bcrypt.hashSync(password, 10);
              const subject = "Mật khẩu người dùng";
              const html = `<p>Mật khẩu của bạn là ${password}. Vui lòng đăng nhập để đổi mật khẩu</p>`;
        
              const info = sendMail(data.email, subject, html);
              data.password = hash
              if(info){
                addTeacherService(data)
                req.flash("success", "Thành công")
              }
              
           
            } catch (error) { 
              req.flash("error", "Thất bại")
            }
          }
        
        });
        
      });
    });
    res.redirect("/admin/manager/teachers")
  },
  exportExcel: async(req, res) => {
    const columns = ["Email", "Tên", "Số điện thoại", "Địa chỉ", "Lớp học đang dạy", "Vai trò"]
    const values = ["email", "name", "phone", "address", "classes", "role"]
    data.forEach(e => {
      if(e.Classes.length){
        let classes=""
        e.Classes.forEach((element, index)=> {
        if(index === e.Classes.length-1){
            classes+= element.name 
            return 
        } 
        classes+= element.name + ", "
      }); 
      e.dataValues.classes = classes
      }
      else{
        e.dataValues.classes = "Chưa có lớp dạy"
      }
      if(e.typeId === 2){
        e.dataValues.role = "Giảng viên"
      }
      else{
        e.dataValues.role = "Trợ giảng"
      }
    });

    exportExcel(data, columns, values, res)
  
  }
};
