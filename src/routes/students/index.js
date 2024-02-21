var express = require("express");
var router = express.Router();
const studentController = require("../../http/controllers/students/home.controller");
const studentMiddleware = require("../../http/middlewares/student.middleware");
const firstLoginMiddleware = require("../../http/middlewares/first.login.middleware");
const resetPasswordMiddleware = require("../../http/middlewares/reset.password.middleware");
const sendOtpMiddleware = require("../../http/middlewares/send.otp.middleware");
const courseController = require("../../http/controllers/students/course.controller");
const handleResetPasswordMiddleware = require("../../http/middlewares/account/handle.reset.password.middleware");
const handleChangePasswordMiddleware = require("../../http/middlewares/account/handle.change.password.middleware");
const updateInfoAccountMiddleware = require("../../http/middlewares/account/update.info.account.middleware");
const classController = require("../../http/controllers/students/class.controller");
const coursesMiddleware = require("../../http/middlewares/student/courses.middleware");
const classesMiddleware = require("../../http/middlewares/student/classes.middleware");
const exercisesMiddleware = require("../../http/middlewares/student/exercises.middleware");
const questionMiddleware = require("../../http/middlewares/student/question.middleware");
const exercisesSubmitMiddleware = require("../../http/middlewares/student/exercises.submit.middleware");
router.use(sendOtpMiddleware);
router.use(studentMiddleware);
router.get(
  "/account/reset-password",
  resetPasswordMiddleware,
  studentController.resetPassword
);
router.post(
  "/account/reset-password",
  resetPasswordMiddleware,
  handleResetPasswordMiddleware(),
  studentController.handleResetPassword
);
router.use(firstLoginMiddleware);
router.get("/", studentController.index);
router.get("/account", studentController.account);
router.post("/account", updateInfoAccountMiddleware(), studentController.updateInfo);
router.get("/account/change-password", studentController.changePassword);
router.post("/account/change-password", handleChangePasswordMiddleware(), studentController.handleChangePassword);
router.get("/timetable", studentController.timetable);
router.get("/courses", courseController.index);
router.get("/courses/:id/module", coursesMiddleware, courseController.module);

router.get("/classes", classController.index);

router.get("/classes/:classId/attendance-detail", classesMiddleware, classController.attendanceDetail);
router.get("/classes/:classId/exercises", classesMiddleware, classController.exercises);
router.get("/classes/:classId/exercises/:id", classesMiddleware, exercisesMiddleware, classController.exerciseDetail);
router.post("/classes/:classId/exercises/:id", classesMiddleware, exercisesMiddleware, exercisesSubmitMiddleware(), classController.exercisesSubmit);

router.get("/classes/:classId/questions", classesMiddleware, classController.questions);
router.post("/classes/:classId/questions", questionMiddleware(), classController.handleQuestion);
router.get("/classes/:classId/all-question", classesMiddleware, classController.allQuestion);

module.exports = router;
