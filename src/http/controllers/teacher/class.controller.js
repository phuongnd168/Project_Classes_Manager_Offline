const model = require("../../../models/index")
const getType = require("../../../utils/getType");
const {Op} = require("sequelize")
const { validationResult } = require("express-validator");
const { getDay } = require("../../../utils/getDay");
const getClassService = require("../../services/teacher/classes/getClass.service")
const filterClassService = require("../../services/teacher/classes/filterClass.service")
const routerRoleRequest = require("../../../utils/routerRoleRequest");
const { getPaginateUrl } = require("../../../utils/getPaginateUrl");
const exportExcel = require("../../../utils/exportExcel");
const getTimetableService = require("../../services/teacher/classes/getTimetable.service");
const moment = require("moment");
const addAttendanceService = require("../../services/teacher/classes/addAttendance.service");

const getExerciseDetailService = require("../../services/teacher/courses/getExerciseDetail.service");
const getExercisesSubmitService = require("../../services/teacher/courses/getExercisesSubmit.service");
const getQuestionService = require("../../services/teacher/questions/getQuestion.service");
const addAnswerService = require("../../services/teacher/questions/addAnswer.service");
const addCommentService = require("../../services/teacher/comments/addComment.service");
let data = null
const Class = model.Class
const User = model.User
const Exercise = model.Exercise
const StudentAttendance = model.students_attendance;
const StudentClass = model.students_class;
const TeacherCalendar = model.teacher_calendar;
const Comment = model.Comment;
module.exports = {
    index: async (req, res) => {
        const {id} = req.user
        const success = req.flash("success");
        const error = req.flash("error");
        const { keyword } = req.query;
        const { PER_PAGE } = process.env;
   
        const filters = await filterClassService(keyword, id)
    
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
        res.render("teacher/classes/index", {
          layout: "layouts/teacher.layout.ejs",
          classes, 
          error, 
          success, 
          req, 
          routerRoleRequest, 
          page, 
          totalPage, 
          offset, 
          getPaginateUrl,
          getDay
        })
    },
    timetable: async (req, res) => {
        const {id} = req.user

        const success = req.flash("success");
        const error = req.flash("error");
        const timetable = await getTimetableService(+id)
        res.render("teacher/classes/timetable", {
          layout: "layouts/teacher.layout.ejs",
          timetable,
          success,
          error,
          req,
          routerRoleRequest
        })
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
  
          element.dataValues.teacher = req.user.name
          element.dataValues.course = element?.Course?.name ?? "Chưa có khóa học"
     
      });
      
      exportExcel(data, columns, values, res)
    
    },
    attendance: async (req, res) => {
      const {classId} = req.params
      const teacherId = req.user.id
      const success = req.flash("success");
      const error = req.flash("error");
      const calendar = await TeacherCalendar.findAll({
        where: {
          [Op.and]: [{classId}, {teacherId}]
        }
      })
      res.render("teacher/classes/attendance", {
        layout: "layouts/teacher.layout.ejs",
        moment,
        classId,
        calendar,
        req,
        routerRoleRequest,
        getPaginateUrl,
        success,
        error,
      })
    },
    attendanceDetail: async(req, res) => {
      const {classId, dayId} = req.params
      const success = req.flash("success");
      const error = req.flash("error");
      const students = await StudentClass.findAll({
        where: {
          [Op.and]: [{classId}, {statusId: 1}]
        },
        include: User
      })
      const calendar = await TeacherCalendar.findByPk(+dayId)
      const dateLearning = calendar.scheduleDate
    
      const dataAttendance = await StudentAttendance.findAll({
        where: {
          [Op.and]: [{dateLearning}, {classId}]
        }
      })
    
      res.render("teacher/classes/attendance-detail", {
        layout: "layouts/teacher.layout.ejs",
        dataAttendance,
        classId,
        students,
        req,
        routerRoleRequest,
        getPaginateUrl,
        success,
        error,
      })
    },
    handleAttendanceDetail: async(req, res) => {
      const {classId, dayId} = req.params
      const {attendance} = req.body
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        addAttendanceService(classId, dayId, attendance)
        req.flash("success", "Lưu điểm danh thành công")
      }else{
        req.flash("error", errors.array())
      }

 
      res.redirect(`/teacher/manager/classes/${classId}/attendance/${dayId}`)
    },
    exercises: async(req, res) => {
      const {classId} = req.params
    
      const success = req.flash("success");
      const error = req.flash("error");
      const exercises = await Exercise.findAll({
        where:{
          classId
        }
      })
      res.render("teacher/classes/exercises", {
        layout: "layouts/teacher.layout.ejs",
        req,
        classId,
        routerRoleRequest,
        getPaginateUrl,
        success,
        error,
        exercises
      })
    },
    addExercises: async(req, res) => {
      const {classId} = req.params
      const success = req.flash("success");
      const error = req.flash("error");
  
      res.render("teacher/classes/add-exercises", {
        layout: "layouts/teacher.layout.ejs",
        req,
        classId,
        routerRoleRequest,
        getPaginateUrl,
        success,
        error,
      })
    },
    handleAddExercises: async(req, res) => {
      const {content, title} = req.body
      const {classId} = req.params

      const errors = validationResult(req);
      if (errors.isEmpty()) {
          await Exercise.create({
              classId,
              title,
              content,
          })
          req.flash("success", "Thêm thành công")
      }else{
          req.flash("error", errors.array());
      }
      res.redirect(`/teacher/manager/classes/${classId}/exercises/add`);
    },
    exerciseDetail: async (req, res) => {
      const success = req.flash("success");
      const error = req.flash("error");
      const {classId, id} = req.params
      const exerciseDetail = await getExerciseDetailService(id)
      const exercisesSubmit = await getExercisesSubmitService(id)
      const comments = await Comment.findAll({
        parentId: {
          [Op.not]: null
        },
        include: User
      })
      res.render("teacher/classes/exercise-detail", {
        layout: "layouts/teacher.layout.ejs",
        req, 
        getType,
        routerRoleRequest, 
        classId,
        id,
        error, 
        comments,
        success,
        exerciseDetail,
        exercisesSubmit
      });
    },
    question: async(req, res) => {
      const success = req.flash("success");
      const error = req.flash("error");
      const {classId} = req.params
      const questions = await getQuestionService(classId)
      res.render("teacher/questions/index", {
        layout: "layouts/teacher.layout.ejs",
        req, 
        getType,
        routerRoleRequest, 
        error, 
        classId,
        success,
        questions
      });
    },
    answer: async (req, res) => {
      const {answer, question} = req.body
      const {classId} = req.params
  
      const {id} = req.user
      const errors = validationResult(req);
      if (errors.isEmpty()) {
          addAnswerService(question, id, answer)
          req.flash("success", "Trả lời thành công")
      }else{
          req.flash("error", errors.array());
      }
      res.redirect(`/teacher/manager/classes/${classId}/questions`);
    },
    comments: async (req, res) => {
      const {exercise, comment} = req.body
      const {classId, id} = req.params
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
          addCommentService(exercise, comment, req.user.id)
          req.flash("success", "Trả lời thành công")
      }else{
          req.flash("error", errors.array());
      }
      res.redirect(`/teacher/manager/classes/${classId}/exercises/${id}`);
    },
}