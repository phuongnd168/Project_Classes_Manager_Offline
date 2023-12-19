var express = require("express");
const teacherController = require("../../http/controllers/teacher/home.controller");
const teacherMiddleware = require("../../http/middlewares/teacher.middleware");
const firstLoginMiddleware = require("../../http/middlewares/first.login.middleware");
const resetPasswordMiddleware = require("../../http/middlewares/reset.password.middleware");

var router = express.Router();

router.use(teacherMiddleware);
router.get(
  "/account/reset-password",
  resetPasswordMiddleware,
  teacherController.resetPassword
);
router.post(
  "/account/reset-password",
  resetPasswordMiddleware,
  teacherController.handleResetPassword
);
router.use(firstLoginMiddleware);
router.get("/", teacherController.index);
router.get("/account", teacherController.account);
router.post("/account", teacherController.updateInfo);
router.get("/account/change-password", teacherController.changePassword);
router.post("/account/change-password", teacherController.handleChangePassword);

module.exports = router;
