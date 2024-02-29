const routerRoleRequest = require("../../../utils/routerRoleRequest");
const model = require("../../../models/index");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const generator = require("generate-password");
const { getPaginateUrl } = require("../../../utils/getPaginateUrl");
const sendMail = require("../../../utils/sendMail");
const getStudentService = require("../../services/admin/students/getStudent.service");
const Excel = require('exceljs');
const filterStudentService = require("../../services/admin/students/filterStudent.service");
const destroyStudentService = require("../../services/admin/students/destroyStudent.service");
const updateStudentService = require("../../services/admin/students/updateStudent.service");
const addStudentService = require("../../services/admin/students/addStudent.service");
const exportExcel = require("../../../utils/exportExcel");
const getClassName = require("../../../utils/getClassName");
const getUserService = require("../../services/role/getUser.service");
const addStudentExcelService = require("../../services/admin/students/addStudentExcel.service");
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
    const className = getClassName(students)
    data = students
    const user = await getUserService(req.user.id)
    res.render("admin/students/index", {
      user,
      req,
      routerRoleRequest,
      className,
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
    const user = await getUserService(req.user.id)
    res.render("admin/students/add", {
      user,
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
        await addStudentService({
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
    const userInfo = await User.findOne({ where: { id } });
    const success = req.flash("success");
    const error = req.flash("error");
    const user = await getUserService(req.user.id)
    res.render("admin/students/edit", {
      error,
      success,
      req,
      routerRoleRequest,
      user,
      userInfo
    });
  },
  handleEditStudent: async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await updateStudentService({ name, email, phone, address }, id);

      req.flash("success", "Sửa thành công");
    } else {
      req.flash("error", errors.array());
    }
    res.redirect("/admin/manager/students/edit/" + id);
  },
  deleteStudent: async (req, res) => {
    const { id } = req.params;
    await destroyStudentService(id);
    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/students");
  },

  deleteAll: async(req, res) => {
    const {id} = req.body
    const data = id.split(",")
    for (const id of data) {
      await destroyStudentService(id)
    }
    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/students");
  },
  importExcel: async(req, res) => {
    const workbook = new Excel.Workbook();
    let error = ""
    const file = req.file
      workbook.xlsx.readFile('./public/uploads/' + file.filename )
      .then(function() {
        ws = workbook.getWorksheet(1)
        const rowsCount = ws.actualRowCount
        ws.eachRow({ includeEmpty: false }, async function(row, rowNumber) {
          if(rowNumber !== 1){
            const [empty, email, name, phone, address] = row.values;
            const data = { email: email.text ?? email, name, phone, address };
    
              const password = generator.generate({
                length: 10,
                numbers: true,
              });
        
              const hash = bcrypt.hashSync(password, 10);
              const subject = "Mật khẩu người dùng";
              const html = `<p>Mật khẩu của bạn là ${password}. Vui lòng đăng nhập để đổi mật khẩu</p>`;
        
              data.password = hash
              data.typeId = 3
              const result = await addStudentExcelService(data)
              if(result){
                error = result
              }
              if(!result){
                sendMail(data.email, subject, html);
              }

              if(rowNumber === rowsCount){
                if(error){
                  req.flash("error", error)
                }else{
                  req.flash("success", "Thành công")
                }
                res.redirect("/admin/manager/students")
              }
          }
        
        });
        
      });


  },
  exportExcel: async(req, res) => {
    const columns = ["Email", "Tên", "Số điện thoại", "Địa chỉ", "Lớp học", "Khóa học"]
    const values = ["email", "name", "phone", "address", "classes", "courses"]
    const className = getClassName(data)
    data.forEach(student => {
       if(student.students_classes?.length){
         student.dataValues.classes = className[student.id].toString()
         let course = "" 
         student.students_classes.forEach((element, index) =>{ 
             if(index === student.students_classes.length-1){
              if(course.includes(element?.Class?.Course?.name)){
                 course = course.slice(0, course.length-2) 
                 return 
              } 
               if(!course){
                 course += element?.Class?.Course?.name ?? "Chưa có khóa học" 
                 return 
              } 
               course += element?.Class?.Course?.name 
            }else{
               if(!element?.Class?.Course?.name){
                 course +=  "" 
                 return 
              }if(course.includes(element.Class.Course.name)){
                 return 
              }
                 course += element?.Class?.Course?.name + ", " 
            } 
          
        }); 
        student.dataValues.courses = course
    }else{
      student.dataValues.classes = "Chưa có lớp học"
      student.dataValues.courses = "Chưa có khóa học"

    } 
    });

    exportExcel(data, columns, values, res)
  
  },
};
