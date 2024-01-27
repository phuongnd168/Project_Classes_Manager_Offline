var express = require("express");
var router = express.Router();

const DashboardController = require("../../http/controllers/admin/dashboard.controller");
const adminMiddleware = require("../../http/middlewares/admin.middleware");
const firstLoginMiddleware = require("../../http/middlewares/first.login.middleware");
const resetPasswordMiddleware = require("../../http/middlewares/reset.password.middleware");
const userController = require("../../http/controllers/admin/user.controller");
const courseController = require("../../http/controllers/admin/course.controller");
const classController = require("../../http/controllers/admin/class.controller");
const addUserMiddleware = require("../../http/middlewares/user/add.user.middleware");
const editUserMiddleware = require("../../http/middlewares/user/edit.user.middleware");
const handleEditUserMiddleware = require("../../http/middlewares/user/handle.edit.user.middleware");
const destroyUserMiddleware = require("../../http/middlewares/user/destroy.user.middleware");
const addClassMiddleware = require("../../http/middlewares/class/add.class.middleware");
const editClassMiddleware = require("../../http/middlewares/class/edit.class.middleware");
const handleEditClassMiddleware = require("../../http/middlewares/class/handle.edit.class.middleware");
const destroyClassMiddleware = require("../../http/middlewares/class/destroy.class.middleware");
const addCourseMiddleware = require("../../http/middlewares/course/add.course.middleware");
const editCourseMiddleware = require("../../http/middlewares/course/edit.course.middleware");
const handleEditCourseMiddleware = require("../../http/middlewares/course/handle.edit.course.middleware");
const destroyCourseMiddleware = require("../../http/middlewares/course/destroy.course.middleware");
const updateInfoAccountMiddleware = require("../../http/middlewares/account/update.info.account.middleware");
const handleChangePasswordMiddleware = require("../../http/middlewares/account/handle.change.password.middleware");
const handleResetPasswordMiddleware = require("../../http/middlewares/account/handle.reset.password.middleware");
const sendOtpMiddleware = require("../../http/middlewares/send.otp.middleware");
const studentController = require("../../http/controllers/admin/student.controller");
const teacherController = require("../../http/controllers/admin/teacher.controller");
const uploadFile = require("../../utils/uploadFile");
const addStudentMiddleware = require("../../http/middlewares/class/add.student.middleware");

router.use(sendOtpMiddleware);
router.use(adminMiddleware);
router.get(
  "/account/reset-password",
  resetPasswordMiddleware,
  DashboardController.resetPassword
);
router.post(
  "/account/reset-password",
  resetPasswordMiddleware,
  handleResetPasswordMiddleware(),
  DashboardController.handleResetPassword
);
router.use(firstLoginMiddleware);
router.get("/", DashboardController.index);
router.get("/account", DashboardController.account);
router.post(
  "/account",
  updateInfoAccountMiddleware(),
  DashboardController.updateInfo
);
router.get("/account/change-password", DashboardController.changePassword);
router.post(
  "/account/change-password",
  handleChangePasswordMiddleware(),
  DashboardController.handleChangePassword
);

router.get("/manager/users", userController.index);
router.get("/manager/users/add", userController.addUser);
router.post(
  "/manager/users/add",
  addUserMiddleware(),
  userController.handleAddUser
);
router.get(
  "/manager/users/edit/:id",
  editUserMiddleware,
  userController.editUser
);
router.post(
  "/manager/users/edit/:id",
  handleEditUserMiddleware(),
  userController.handleEditUser
);
router.post(
  "/manager/users/delete/:id",
  destroyUserMiddleware,
  userController.deleteUser
);
router.post(
  "/manager/users/deleteAll",
  userController.deleteAll
);
router.post(
  "/manager/users/import-excel",
  uploadFile,
  userController.importExcel
);
router.get(
  "/manager/users/export-excel",
  userController.exportExcel
);

router.get("/manager/students", studentController.index);
router.get("/manager/students/add", studentController.addStudent);
router.post(
  "/manager/students/add",
  addUserMiddleware(),
  studentController.handleAddStudent
);
router.get(
  "/manager/students/edit/:id",
  editUserMiddleware,
  studentController.editStudent
);
router.post(
  "/manager/students/edit/:id",
  handleEditUserMiddleware(),
  studentController.handleEditStudent
);
router.post(
  "/manager/students/delete/:id",
  destroyUserMiddleware,
  studentController.deleteStudent
);

router.post(
  "/manager/students/deleteAll",
  studentController.deleteAll
);
router.post(
  "/manager/students/import-excel",
  uploadFile,
  studentController.importExcel
);
router.get(
  "/manager/students/export-excel",
  studentController.exportExcel
);


router.get("/manager/teachers", teacherController.index);
router.get("/manager/teachers/add", teacherController.addTeacher);
router.post(
  "/manager/teachers/add",
  addUserMiddleware(),
  teacherController.handleAddTeacher
);
router.get(
  "/manager/teachers/edit/:id",
  editUserMiddleware,
  teacherController.editTeacher
);
router.post(
  "/manager/teachers/edit/:id",
  handleEditUserMiddleware(),
  teacherController.handleEditTeacher
);
router.post(
  "/manager/teachers/delete/:id",
  destroyUserMiddleware,
  teacherController.deleteTeacher
);
router.get(
  "/manager/teachers/timetable/:id",
  teacherController.timetable
);
router.post(
  "/manager/teachers/deleteAll",
  teacherController.deleteAll
);
router.post(
  "/manager/teachers/import-excel",
  uploadFile,
  teacherController.importExcel
);
router.get(
  "/manager/teachers/export-excel",
  teacherController.exportExcel
);

router.get("/manager/courses", courseController.index);
router.get("/manager/courses/add", courseController.addCourse);
router.post(
  "/manager/courses/add",
  addCourseMiddleware(),
  courseController.handleAddCourse
);
router.get(
  "/manager/courses/edit/:id",
  editCourseMiddleware,
  courseController.editCourse
);
router.post(
  "/manager/courses/edit/:id",
  handleEditCourseMiddleware(),
  courseController.handleEditCourse
);
router.post(
  "/manager/courses/delete/:id",
  destroyCourseMiddleware,
  courseController.deleteCourse
);
router.get(
  "/manager/courses/module/:id",
  editCourseMiddleware,
  courseController.module
);
router.post(
  "/manager/courses/deleteAll",
  courseController.deleteAll
);
router.post(
  "/manager/courses/import-excel",
  uploadFile,
  courseController.importExcel
);
router.get(
  "/manager/courses/export-excel",
  courseController.exportExcel
);

router.get("/manager/classes", classController.index);
router.get("/manager/classes/add", classController.addClass);
router.post(
  "/manager/classes/add",
  addClassMiddleware(),
  classController.handleAddClass
);
router.get(
  "/manager/classes/edit/:id",
  editClassMiddleware,
  classController.editClass
);
router.post(
  "/manager/classes/edit/:id",
  handleEditClassMiddleware(),
  classController.handleEditClass
);
router.post(
  "/manager/classes/delete/:id",
  destroyClassMiddleware,
  classController.deleteClass
);
router.get(
  "/manager/classes/students",
  classController.students
);
router.get(
  "/manager/classes/students/add/:id",
  classController.addStudent
);
router.post(
  "/manager/classes/students/add/:id",
  addStudentMiddleware(),
  classController.handleAddStudent
);
router.get(
  "/manager/classes/students/remove/:id",
  classController.removeStudent
);
router.post(
  "/manager/classes/students/remove/:id",
  classController.handleRemoveStudent
);
router.post(
  "/manager/classes/deleteAll",
  classController.deleteAll
);
router.post(
  "/manager/classes/import-excel",
  uploadFile,
  classController.importExcel
);
router.get(
  "/manager/classes/export-excel",
  classController.exportExcel
);
module.exports = router;
