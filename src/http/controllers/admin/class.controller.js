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

    const offset = (page - 1) * PER_PAGE;
    const classes = await getClassService(filters, +PER_PAGE, offset);
    data = classes
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
    const courses = await Course.findAll()
    res.render("admin/classes/add", {
      courses,
      error,
      success,
      req,
      routerRoleRequest,
      getDay,
    });
  },
  handleAddClass: async (req, res) => {
    const errors = validationResult(req);
    const {
      name,
      quantity,
      startDate,
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
          timeLearn,
          courseId: course
        },
        schedule,
        startDate,
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
    const classInfo = await Class.findOne({ where: { id },  include: [ { model: ClassSchedule }, {model: Course}]});
    const course = await Course.findAll({
      where: {
         id: { [Op.ne]: classInfo?.Course?.id ?? "" } 
    },})
   
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
          timeLearn,
          courseId: course
        },
        id,
        schedule,
        startDate,
        timeLearnStart
      );
      req.flash("success", "Sửa thành công");
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
    res.render("admin/classes/student", {
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
    res.render("admin/classes/student/add", { 
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
      addStudentService(student, id)
      req.flash("success", "Thêm thành công");
    }else{
      req.flash("error", errors.array());
    }


    res.redirect("/admin/manager/classes/students")
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
    res.render("admin/classes/student/remove", { 
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
    removeStudentService(student, id)
    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/classes/students")
  },
  deleteClass: async (req, res) => {
    const { id } = req.params;
    destroyClassService(id);

    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/classes");
  },
  deleteAll: async(req, res) => {
    const {id} = req.body
    const data = id.split(",")
    data.forEach((id) => {
      destroyClassService(id)
    });
    req.flash("success", "Xóa thành công");
    res.redirect("/admin/manager/classes");
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
            const [empty, name, quantity, startDate, schedule, timeLearn, courseId] = row.values;
            const data = { name, quantity, startDate, schedule, timeLearn, courseId};
  
            try {
          
                addClassService(data, schedule.toString(), startDate, timeLearn.slice(0, 5))
                req.flash("success", "Thành công")
              
              

            } catch (error) { 
              req.flash("error", "Thất bại")
            }
          }
        
        });
        
      });
    });
    res.redirect("/admin/manager/classes")
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

        element.dataValues.teacher = element?.Course?.User?.name ?? "Chưa có giảng viên" 
        element.dataValues.course = element?.Course?.name ?? "Chưa có khóa học"
   
    });

    exportExcel(data, columns, values, res)
  
  },
};
