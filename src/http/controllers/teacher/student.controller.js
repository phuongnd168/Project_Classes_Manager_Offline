const filterStudentService = require("../../services/teacher/students/filterStudent.service");
const model = require("../../../models/index");
const getStudentService = require("../../services/teacher/students/getStudent.service");
const getClassName = require("../../../utils/teacher/getClassName");
const exportExcel = require("../../../utils/exportExcel");
const { validationResult } = require("express-validator");
const routerRoleRequest = require("../../../utils/routerRoleRequest");
const { getPaginateUrl } = require("../../../utils/getPaginateUrl");
const {Op} = require("sequelize")
const getClassService = require("../../services/teacher/classes/getClass.service");
const updateStudentService = require("../../services/teacher/students/updateStudent.service");
let data = null
const User = model.User;
const Class = model.Class;
const StudentClass = model.students_class;
const LearningStatus = model.learning_status
module.exports = {
    index: async (req, res) => {
        const success = req.flash("success");
        const error = req.flash("error");
        const { keyword } = req.query;
        const { PER_PAGE } = process.env;
        const {id} = req.user
        const filters = await filterStudentService(keyword, id)
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
        let classes = await getClassService(null, null, null, id)
        classes = classes.map(element => {
          return element.name
        });
        const className = getClassName(students, classes)
      
        data = students
    
        res.render("teacher/students/index", {
          layout: "layouts/teacher.layout.ejs",
          id,
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
    editStudent: async(req, res) => {
      const success = req.flash("success");
      const error = req.flash("error");
      const teacherId = req.user.id
      const {id} = req.params
      const studentClasses = await StudentClass.findAll({
        where: {
          studentId: id
        },
        include: [{model: Class}, {model: User}]
      })
    
      let classes = await getClassService(null, null, null, teacherId)
        classes = classes.map(element => {
          return element.name
        });
     
      res.render("teacher/students/edit", {
        layout: "layouts/teacher.layout.ejs",
        classes,
        id,
        studentClasses,
        req,
        routerRoleRequest,
        getPaginateUrl,
        success,
        error,
      })
    },
    editStudentClass: async(req, res) =>{
      const success = req.flash("success");
      const error = req.flash("error");

      const {id, classId} = req.params
      const studentClass = await StudentClass.findOne({
        where: {
          [Op.and]: [{studentId: id}, {classId}]
        },
        include: [{model: LearningStatus}, {model: Class}]
      })
      const status = await LearningStatus.findAll({
        where: {
          id: {[Op.ne]: studentClass.learning_status["id"]}
        }
      })
      res.render("teacher/students/edit-detail", {
        layout: "layouts/teacher.layout.ejs",
        req,
        status,
        id,
        studentClass,
        routerRoleRequest,
        getPaginateUrl,
        success,
        error,
      })
    },
    handleEditStudentClass: async(req, res) => {
      const {id, classId} = req.params
      const {status, time, reason} = req.body
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        updateStudentService(id, classId, status, time, reason)
        req.flash("success", "Sửa thành công")
      }else{
        req.flash("error", errors.array());
      }
      res.redirect(`/teacher/manager/students/edit/${id}/class/${classId}`)
    },
    exportExcel: async(req, res) => {
      const columns = 
      ["Email", "Tên", "Số điện thoại", "Địa chỉ", "Lớp học", "Khóa học"]
      const values = ["email", "name", "phone", "address", "classes", "courses"]
      let classes = await getClassService(null, null, null, req.user.id)
      classes = classes.map(element => {
        return element.name
      });
      const className = getClassName(data, classes)
      data.forEach((student) => {
           if(student.students_classes?.length){
              student.dataValues.classes = className[student.id].toString()
               let course = "" 
               student.students_classes.forEach((element, index) =>{ 
                 if(element?.Class?.Course?.teacherId !== req.user.id){
                     course.includes(",") ?  course = course.slice(0, course.length-2) : course 
                   return 
                } 
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
        
         }) 
      
      exportExcel(data, columns, values, res)
    
  },
  

  
}