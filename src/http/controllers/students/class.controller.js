const routerRoleRequest = require("../../../utils/routerRoleRequest");
const getType = require("../../../utils/getType");
const { validationResult } = require("express-validator");
const getAttendanceDetailService = require("../../services/student/classes/getAttendanceDetail.service");
const getClassService = require("../../services/student/classes/getClass.service");
const moment = require("moment");
const {Op} = require("sequelize")
const getExercisesService = require("../../services/student/exercises/getExercises.service");
const getExerciseDetailService = require("../../services/student/exercises/getExerciseDetail.service");
const model = require("../../../models/index")
const Comment = model.Comment
const getExercisesSubmitService = require("../../services/student/exercises/getExercisesSubmit.service");
const addQuestionService = require("../../services/student/questions/addQuestion.service");
const getQuestionService = require("../../services/student/questions/getQuestion.service");
const addExerciseSubmitService = require("../../services/student/exercises/addExerciseSubmit.service");

module.exports = {
    index: async (req, res) => {
        const success = req.flash("success");
        const error = req.flash("error");
        const {id} = req.user
        const classes = await getClassService(id)
  
        res.render("students/classes/index", {
          layout: "layouts/student.layout.ejs",
          req, 
          routerRoleRequest, 
          error, 
          success,
          classes
        });
    },
  
    attendanceDetail: async(req, res) => {
      const success = req.flash("success");
      const error = req.flash("error");
      const {classId} = req.params
      const {id} = req.user
      const attendanceDetail = await getAttendanceDetailService(id, classId)

      res.render("students/classes/attendance-detail", {
        layout: "layouts/student.layout.ejs",
        req, 
        routerRoleRequest, 
        moment,
        error, 
        success,
        attendanceDetail
      });
    },
    exercises: async (req, res) => {
      const success = req.flash("success");
      const error = req.flash("error");
      const {classId} = req.params
      const exercises = await getExercisesService(classId)
   
      res.render("students/exercises/index", {
        layout: "layouts/student.layout.ejs",
        req, 
        classId,
        routerRoleRequest, 
        error, 
        success,
        exercises
      });
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
        include: model.User
      })
      res.render("students/exercises/exercise-detail", {
        layout: "layouts/student.layout.ejs",
        req, 
        getType,
        routerRoleRequest, 
        classId,
        comments,
        id,
        error, 
        success,
        exerciseDetail,
        exercisesSubmit
      });
    },
    exercisesSubmit: async (req, res) => {
      const {classId, id} = req.params
      const {exercisesSubmit} = req.body

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        addExerciseSubmitService(id, req.user.id, exercisesSubmit, classId)
        req.flash("success", "Nộp bài tập thành công")
      }else {
        req.flash("error", errors.array());
      }
      res.redirect(`/classes/${classId}/exercises/${id}`);

    },
    questions: async(req, res) => {
      const success = req.flash("success");
      const error = req.flash("error");
      const {classId} = req.params
      res.render("students/questions/index", {
        layout: "layouts/student.layout.ejs",
        req, 
        routerRoleRequest, 
        error, 
        classId,
        success,
      });
    },
    handleQuestion: async(req, res) => {
      const {classId} = req.params
      const {question} = req.body
      const {id} = req.user
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        addQuestionService(question, id, classId)
        req.flash("success", "Đặt câu hỏi thành công")
      }else {
        req.flash("error", errors.array());
      }
      res.redirect(`/classes/${classId}/questions`);

    },
    allQuestion: async(req, res) => {
      const success = req.flash("success");
      const error = req.flash("error");
      const {classId} = req.params
      const questions = await getQuestionService(classId)

      res.render("students/questions/all-question", {
        layout: "layouts/student.layout.ejs",
        req, 
        getType,
        routerRoleRequest, 
        error, 
        classId,
        success,
        questions
      });
    }
}