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
const editStudentMiddleware = require("../../http/middlewares/student/edit.student.middleware");
const handleEditStudentMiddleware = require("../../http/middlewares/student/handle.edit.student.middleware");
const handleAddAttendanceMiddleware = require("../../http/middlewares/class/handle.add.attendance.middleware");
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
router.get("/manager/classes/:classId/attendance", classController.attendance);
router.get("/manager/classes/:classId/attendance/:dayId", classController.attendanceDetail);
router.post("/manager/classes/:classId/attendance/:dayId", handleAddAttendanceMiddleware(), classController.handleAttendanceDetail);

router.get("/manager/courses", courseController.index);
router.get("/manager/courses/export-excel", courseController.exportExcel);
router.get("/manager/courses/:id/module", courseController.module);
router.get("/manager/courses/:id/module/add", courseController.addModule);
router.post("/manager/courses/:id/module/add", addModuleMiddleware(), courseController.handleAddModule);
router.get("/manager/courses/:id/module/add-module-document/:idModule", courseController.addModuleDocument);
router.post("/manager/courses/:id/module/add-module-document/:idModule", addModuleDocumentMiddleware(), courseController.handleAddModuleDocument);
router.get("/manager/courses/:id/module/edit-module-document/:idModule", courseController.editModuleDocument);
router.post("/manager/courses/:id/module/edit-module-document/:idModule", editModuleDocumentMiddleware(), courseController.handleEditModuleDocument);


router.get("/manager/students", studentController.index);
router.get("/manager/students/edit/:id", editStudentMiddleware, studentController.editStudent);
router.get("/manager/students/edit/:id/class/:classId", studentController.editStudentClass);
router.post("/manager/students/edit/:id/class/:classId", handleEditStudentMiddleware(), studentController.handleEditStudentClass);
router.get("/manager/students/export-excel", studentController.exportExcel);

module.exports = router;
