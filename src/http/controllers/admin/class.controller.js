const model = require("../../../models/index");
const { getDay } = require("../../../utils/getDay");
const routerRoleRequest = require("../../../utils/routerRoleRequest");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const { getPaginateUrl } = require("../../../utils/getPaginateUrl");
const Excel = require('exceljs');
const addClassService = require("../../services/admin/classes/addClass.service");
const destroyClassService = require("../../services/admin/classes/destroyClass.service");
const updateClassService = require("../../services/admin/classes/updateClass.service");
const getClassService = require("../../services/admin/classes/getClass.service");
const filterClassService = require("../../services/admin/classes/filterClass.service");
const addStudentService = require("../../services/admin/classes/addStudent.service");
const exportExcel = require("../../../utils/exportExcel");
const removeStudentService = require("../../services/admin/classes/removeStudent.service");
const getUserService = require("../../services/role/getUser.service");
const addClassExcelService = require("../../services/admin/classes/addClassExcel.service");
let data = null;
const Class = model.Class;
const StudentClass = model.students_class;
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
    const user = await getUserService(req.user.id)
    const offset = (page - 1) * PER_PAGE;
    const classes = await getClassService(filters, +PER_PAGE, offset);
    data = classes
    res.render("admin/classes/index", {
      user,
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

    const courses = await Course.findAll()
    const teachers = await User.findAll({
      where: {
        typeId: 2,
      },
    });
    const user = await getUserService(req.user.id)
    res.render("admin/classes/add", {
      user,
      courses,
      error,
      success,
      teachers,
      req,
      routerRoleRequest,
      getDay,
    });
  },
  handleAddClass: async (req, res) => {
    const errors = validationResult(req);
    const {
      name,
      teacher,
      quantity,
      startDate,
      schedule,
      timeLearnStart,
      course
    } = req.body;
    const timeLearnEnd = +timeLearnStart.slice(0, 2) + 3 + ":00"
    const timeLearn = timeLearnStart + "-" + timeLearnEnd
    if (errors.isEmpty()) {
      const check = await addClassService(
        {
          name,
          quantity,
          startDate,
          timeLearn,
          courseId: course,
          teacherId: teacher
        },
        teacher,
        schedule,
        startDate,
        timeLearnStart
      );
      if(check === 1){
        req.flash("error", "Trùng lịch dạy, vui lòng chọn lịch học khác");
      }else{
        req.flash("success", "Thêm thành công");
      }

    } else {
      req.flash("error", errors.array());
    }
    res.redirect("/admin/manager/classes/add");
  },
  editClass: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const { id } = req.params;
    
    const classInfo = await Class.findOne({ where: { id },  include: [ { model: ClassSchedule }, {model: Course}, {model: User}]});
    const courses = await Course.findAll({
      where: {
         id: { [Op.ne]: classInfo?.Course?.id ?? "" } 
    },})
   
    const teachers = await User.findAll({
      where: { 
        [Op.and]: [{typeId: 2}, {id: {[Op.ne]: classInfo?.User?.id ?? ""}}]
      },
        
 
    });
 
    let schedule = {} 
    if(classInfo.classes_schedules?.length){
      classInfo.classes_schedules.forEach((e) => {
         schedule[e.schedule] = e.schedule 
      }) 
    }
    const user = await getUserService(req.user.id)
    res.render("admin/classes/edit", {
      error,
      user,
      schedule,
      success,
      req,
      courses,
      teachers,
      routerRoleRequest,
      classInfo,
      getDay,
    });
  },
  handleEditClass: async (req, res) => {
    const errors = validationResult(req);
    const { id } = req.params;
    const {
      name,
      quantity,
      startDate,
      schedule,
      teacher,
      course,
      timeLearnStart,

    } = req.body;
    const timeLearnEnd = +timeLearnStart.slice(0, 2) + 3 + ":00"
    const timeLearn = timeLearnStart + "-" + timeLearnEnd
    if (errors.isEmpty()) {
      const check = await updateClassService(
        {
          name,
          quantity,
          startDate,
          timeLearn,
          courseId: course,
          teacherId: teacher,
        },
        id,
        teacher,
        schedule,
        startDate,
        timeLearnStart
      );
      if(check === 1){
        req.flash("error", "Trùng lịch dạy, vui lòng chọn lịch học khác");
      }else{
        req.flash("success", "Sửa thành công");
      }

    } else {
      req.flash("error", errors.array());
    }
    res.redirect("/admin/manager/classes/edit/" + id);
  },
  students: async(req, res) => {
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
    const user = await getUserService(req.user.id)
    res.render("admin/classes/student", {
      user,
      req,
      routerRoleRequest,
      getPaginateUrl,
      classes,
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
    const {id} = req.params
    let students = await User.findAll({include:[{model: StudentClass, where: {classId: +id}}] })

    const addStudent = students.map(student => student.id);
    students = await User.findAll({
      where:{
        [Op.and]: [{typeId: 3}, {id: {[Op.notIn]: addStudent}}]
 
      }
    })
    const user = await getUserService(req.user.id)
    res.render("admin/classes/student/add", { 
      user,
      students,
      success,
      error,
      id,
      req, 
      routerRoleRequest
    })
  },
  handleAddStudent: async (req, res) => {
    const {id} = req.params
    const {student} = req.body
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const check = await addStudentService(student, id)
 
      if(check === 1){
        req.flash("error", "Trùng lịch học, vui lòng chọn lớp khác");
      }
      else{
        req.flash("success", "Thêm thành công");
      }
      
    }else{
      req.flash("error", errors.array());
    }


    res.redirect("/admin/manager/classes/students/add/" +id)
  },
  removeStudent: async (req, res) => {
    const success = req.flash("success");
    const error = req.flash("error");
    const {id} = req.params
    let students = await User.findAll({include:[{model: StudentClass, where: {classId: +id}}] })

    const removeStudent = students.map(student => student.id);
    students = await User.findAll({
      where:{
        [Op.and]: [{typeId: 3}, {id: {[Op.in]: removeStudent}}]
 
      }
    })
    const user = await getUserService(req.user.id)
    res.render("admin/classes/student/remove", { 
      user,
      students,
      success,
      error,
      id,
      req, 
      routerRoleRequest
    })
  },
  handleRemoveStudent: async (req, res) => {
    const {id} = req.params
    const {student} = req.body
    await removeStudentService(student, id)
    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/classes/students/remove/" +id)
  },
  deleteClass: async (req, res) => {
    const { id } = req.params;
    await destroyClassService(id);

    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/classes");
  },
  deleteAll: async(req, res) => {
    const {id} = req.body
    const data = id.split(",")
    for (const id of data) {
      await destroyClassService(id)
    };
    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/classes");
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
            const [empty, name, quantity, startDate, schedule, timeLearn, teacher, course] = row.values;
            const data = { name, quantity, startDate, schedule, timeLearn, teacher, course};
            const result = await addClassExcelService(data)
            if(result){
              error = result
            }
            if(rowNumber === rowsCount){
              if(error){
                req.flash("error", error)
              }else{
                req.flash("success", "Thành công")
              }
                res.redirect("/admin/manager/classes")
            }     
          }
        
        });
        
      });
    
  },
  exportExcel: async(req, res) => {
    const columns = 
    ["Tên lớp", "Sĩ số", "Ngày khai giảng", "Ngày bế giảng", "Lịch học", "Thời gian học", "Giảng viên", "Khóa học"]
    const values = ["name", "quantity", "startDate", "endDate", "schedule", "timeLearn", "teacher", "course"]
    data.forEach(element => {
        if (element.classes_schedules?.length) {
         let schedule = "" 
          element.classes_schedules.forEach((e, index) => {
             if(index===element.classes_schedules.length-1){
               schedule += getDay(e.schedule)  
               return 
            } 
             schedule += getDay(e.schedule) + ", " 
      
            });
            element.dataValues.schedule = schedule 
          }else{
            element.dataValues.schedule = getDay(element.schedule) 
          }

        element.dataValues.teacher = element?.User?.name ?? "Chưa có giảng viên" 
        element.dataValues.course = element?.Course?.name ?? "Chưa có khóa học"
   
    });

    exportExcel(data, columns, values, res)
  
  },
};
