var express = require("express");
const teacherController = require("../../http/controllers/teacher/home.controller");
const teacherMiddleware = require("../../http/middlewares/teacher.middleware");
const firstLoginMiddleware = require("../../http/middlewares/first.login.middleware");
const resetPasswordMiddleware = require("../../http/middlewares/reset.password.middleware");
const sendOtpMiddleware = require("../../http/middlewares/send.otp.middleware");
const handleResetPasswordMiddleware = require("../../http/middlewares/account/handle.reset.password.middleware");
const updateInfoAccountMiddleware = require("../../http/middlewares/account/update.info.account.middleware");
const handleChangePasswordMiddleware = require("../../http/middlewares/account/handle.change.password.middleware");
const classController = require("../../http/controllers/teacher/class.controller");
const courseController = require("../../http/controllers/teacher/course.controller");
const addModuleMiddleware = require("../../http/middlewares/course/add.module.middleware");
const addModuleDocumentMiddleware = require("../../http/middlewares/course/add.module.document.middleware");
const editModuleDocumentMiddleware = require("../../http/middlewares/course/edit.module.document.middleware");
const studentController = require("../../http/controllers/teacher/student.controller");
const handleEditStudentMiddleware = require("../../http/middlewares/student/handle.edit.student.middleware");
const handleAddAttendanceMiddleware = require("../../http/middlewares/class/handle.add.attendance.middleware");
const handleAddExercisesMiddleware = require("../../http/middlewares/class/handle.add.exercises.middleware");
const attendanceMiddleware = require("../../http/middlewares/teacher/attendance.middleware");
const scheduleMiddleware = require("../../http/middlewares/teacher/schedule.middleware");
const exercisesMiddleware = require("../../http/middlewares/teacher/exercises.middleware");
const exercisesDetailMiddleware = require("../../http/middlewares/teacher/exercises.detail.middleware");
const coursesMiddleware = require("../../http/middlewares/teacher/courses.middleware");
const moduleMiddleware = require("../../http/middlewares/teacher/module.middleware");
const editModuleMiddleware = require("../../http/middlewares/teacher/edit.module.middleware");
const studentMiddleware = require("../../http/middlewares/teacher/student.middleware");
const editStudentMiddleware = require("../../http/middlewares/teacher/edit.student.middleware");
const answerMiddleware = require("../../http/middlewares/teacher/answer.middleware");
const commentMiddleware = require("../../http/middlewares/teacher/comment.middleware");
var router = express.Router();

router.use(sendOtpMiddleware);
router.use(teacherMiddleware);
router.get(
  "/account/reset-password",
  resetPasswordMiddleware,
  teacherController.resetPassword
);
router.post(
  "/account/reset-password",
  resetPasswordMiddleware,
  handleResetPasswordMiddleware(),
  teacherController.handleResetPassword
);
router.use(firstLoginMiddleware);
router.get("/", teacherController.index);
router.get("/account", teacherController.account);
router.post("/account", updateInfoAccountMiddleware(), teacherController.updateInfo);
router.get("/account/change-password", teacherController.changePassword);
router.post("/account/change-password", handleChangePasswordMiddleware(), teacherController.handleChangePassword);


router.get("/manager/classes", classController.index);
router.get("/manager/classes/timetable", classController.timetable);
router.get("/manager/classes/export-excel", classController.exportExcel);
router.get("/manager/classes/:classId/attendance", attendanceMiddleware, classController.attendance);
router.get("/manager/classes/:classId/attendance/:dayId", scheduleMiddleware, classController.attendanceDetail);
router.post("/manager/classes/:classId/attendance/:dayId", handleAddAttendanceMiddleware(), classController.handleAttendanceDetail);
router.get("/manager/classes/:classId/exercises", exercisesMiddleware, classController.exercises);
router.get("/manager/classes/:classId/exercises/add", exercisesMiddleware, classController.addExercises);
router.post("/manager/classes/:classId/exercises/add", handleAddExercisesMiddleware(), classController.handleAddExercises);
router.get("/manager/classes/:classId/exercises/:id", exercisesMiddleware, exercisesDetailMiddleware, classController.exerciseDetail);
router.post("/manager/classes/:classId/exercises/:id", commentMiddleware(), classController.comments);
router.get("/manager/classes/:classId/questions", attendanceMiddleware, classController.question);
router.post("/manager/classes/:classId/questions", answerMiddleware(), classController.answer);

router.get("/manager/courses", courseController.index);
router.get("/manager/courses/export-excel", courseController.exportExcel);
router.get("/manager/courses/:id/module", coursesMiddleware, courseController.module);
router.get("/manager/courses/:id/module/add", coursesMiddleware, courseController.addModule);
router.post("/manager/courses/:id/module/add", addModuleMiddleware(), courseController.handleAddModule);
router.get("/manager/courses/:id/module/add-module-document/:idModule", coursesMiddleware, moduleMiddleware, courseController.addModuleDocument);
router.post("/manager/courses/:id/module/add-module-document/:idModule", addModuleDocumentMiddleware(), courseController.handleAddModuleDocument);
router.get("/manager/courses/:id/module/edit-module-document/:idModule", coursesMiddleware, editModuleMiddleware, courseController.editModuleDocument);
router.post("/manager/courses/:id/module/edit-module-document/:idModule", editModuleDocumentMiddleware(), courseController.handleEditModuleDocument);


router.get("/manager/students", studentController.index);
router.get("/manager/students/edit/:id", studentMiddleware, studentController.editStudent);
router.get("/manager/students/edit/:id/class/:classId", studentMiddleware, editStudentMiddleware, studentController.editStudentClass);
router.post("/manager/students/edit/:id/class/:classId", handleEditStudentMiddleware(), studentController.handleEditStudentClass);
router.get("/manager/students/export-excel", studentController.exportExcel);

module.exports = router;
