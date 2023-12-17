var express = require("express");
var router = express.Router();
const DashboardController = require("../../http/controllers/admin/dashboard.controller");
const adminMiddleware = require("../../http/middlewares/admin.middleware");
const firstLoginMiddleware = require("../../http/middlewares/first.login.middleware");
const resetPasswordMiddleware = require("../../http/middlewares/reset.password.middleware");
const userController = require("../../http/controllers/admin/user.controller");
const courseController = require("../../http/controllers/admin/course.controller");
const classController = require("../../http/controllers/admin/class.controller");

router.get(
  "/",
  adminMiddleware,
  firstLoginMiddleware,
  DashboardController.index
);
router.get(
  "/account",
  adminMiddleware,
  firstLoginMiddleware,
  DashboardController.account
);
router.post(
  "/account",
  adminMiddleware,
  firstLoginMiddleware,
  DashboardController.updateInfo
);
router.get(
  "/account/change-password",
  adminMiddleware,
  firstLoginMiddleware,
  DashboardController.changePassword
);
router.post(
  "/account/change-password",
  adminMiddleware,
  firstLoginMiddleware,
  DashboardController.handleChangePassword
);
router.get(
  "/account/reset-password",
  adminMiddleware,
  resetPasswordMiddleware,
  DashboardController.resetPassword
);
router.post(
  "/account/reset-password",
  adminMiddleware,
  resetPasswordMiddleware,
  DashboardController.handleResetPassword
);

router.get(
  "/manager/users",
  adminMiddleware,
  firstLoginMiddleware,
  userController.index
);
router.get(
  "/manager/users/add",
  adminMiddleware,
  firstLoginMiddleware,
  userController.addUser
);
router.post(
  "/manager/users/add",
  adminMiddleware,
  firstLoginMiddleware,
  userController.handleAddUser
);
router.get(
  "/manager/users/edit/:id",
  adminMiddleware,
  firstLoginMiddleware,
  userController.editUser
);

router.post(
  "/manager/users/edit/:id",
  adminMiddleware,
  firstLoginMiddleware,
  userController.handleEditUser
);
router.post(
  "/manager/users/delete/:id",
  adminMiddleware,
  firstLoginMiddleware,
  userController.deleteUser
);
router.get(
  "/manager/courses",
  adminMiddleware,
  firstLoginMiddleware,
  courseController.index
);
router.get(
  "/manager/courses/add",
  adminMiddleware,
  firstLoginMiddleware,
  courseController.addCourse
);
router.post(
  "/manager/courses/add",
  adminMiddleware,
  firstLoginMiddleware,
  courseController.handleAddCourse
);
router.get(
  "/manager/courses/edit/:id",
  adminMiddleware,
  firstLoginMiddleware,
  courseController.editCourse
);

router.post(
  "/manager/courses/edit/:id",
  adminMiddleware,
  firstLoginMiddleware,
  courseController.handleEditCourse
);
router.post(
  "/manager/courses/delete/:id",
  adminMiddleware,
  firstLoginMiddleware,
  courseController.deleteCourse
);
router.get(
  "/manager/classes",
  adminMiddleware,
  firstLoginMiddleware,
  classController.index
);

router.get(
  "/manager/classes/add",
  adminMiddleware,
  firstLoginMiddleware,
  classController.addClass
);
router.post(
  "/manager/classes/add",
  adminMiddleware,
  firstLoginMiddleware,
  classController.handleAddClass
);
router.get(
  "/manager/classes/edit/:id",
  adminMiddleware,
  firstLoginMiddleware,
  classController.editClass
);

router.post(
  "/manager/classes/edit/:id",
  adminMiddleware,
  firstLoginMiddleware,
  classController.handleEditClass
);
router.post(
  "/manager/classes/delete/:id",
  adminMiddleware,
  firstLoginMiddleware,
  classController.deleteClass
);
module.exports = router;
