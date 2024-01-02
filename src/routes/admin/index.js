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
router.get(
  "/manager/students/:id/addClass",
  studentController.addClass
);
router.post(
  "/manager/students/:id/addClass",
  studentController.handleAddClass
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
router.get("/manager/classes/export", classController.exportClass);
module.exports = router;
