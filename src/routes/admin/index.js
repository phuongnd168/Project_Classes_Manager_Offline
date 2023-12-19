var express = require("express");
var router = express.Router();
const DashboardController = require("../../http/controllers/admin/dashboard.controller");
const adminMiddleware = require("../../http/middlewares/admin.middleware");
const firstLoginMiddleware = require("../../http/middlewares/first.login.middleware");
const resetPasswordMiddleware = require("../../http/middlewares/reset.password.middleware");
const userController = require("../../http/controllers/admin/user.controller");
const courseController = require("../../http/controllers/admin/course.controller");
const classController = require("../../http/controllers/admin/class.controller");

router.use(adminMiddleware);
router.get(
  "/account/reset-password",
  resetPasswordMiddleware,
  DashboardController.resetPassword
);
router.post(
  "/account/reset-password",
  resetPasswordMiddleware,
  DashboardController.handleResetPassword
);
router.use(firstLoginMiddleware);
router.get("/", DashboardController.index);
router.get("/account", DashboardController.account);
router.post("/account", DashboardController.updateInfo);
router.get("/account/change-password", DashboardController.changePassword);
router.post(
  "/account/change-password",
  DashboardController.handleChangePassword
);

router.get("/manager/users", userController.index);
router.get("/manager/users/add", userController.addUser);
router.post("/manager/users/add", userController.handleAddUser);
router.get("/manager/users/edit/:id", userController.editUser);
router.post("/manager/users/edit/:id", userController.handleEditUser);
router.post("/manager/users/delete/:id", userController.deleteUser);

router.get("/manager/courses", courseController.index);
router.get("/manager/courses/add", courseController.addCourse);
router.post("/manager/courses/add", courseController.handleAddCourse);
router.get("/manager/courses/edit/:id", courseController.editCourse);
router.post("/manager/courses/edit/:id", courseController.handleEditCourse);
router.post("/manager/courses/delete/:id", courseController.deleteCourse);

router.get("/manager/classes", classController.index);
router.get("/manager/classes/add", classController.addClass);
router.post("/manager/classes/add", classController.handleAddClass);
router.get("/manager/classes/edit/:id", classController.editClass);
router.post("/manager/classes/edit/:id", classController.handleEditClass);
router.post("/manager/classes/delete/:id", classController.deleteClass);
router.get("/manager/classes/export", classController.exportClass);
module.exports = router;
