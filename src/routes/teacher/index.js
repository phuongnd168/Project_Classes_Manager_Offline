var express = require("express");
const teacherController = require("../../http/controllers/teacher/home.controller");
const teacherMiddleware = require("../../http/middlewares/teacher.middleware");
const firstLoginMiddleware = require("../../http/middlewares/first.login.middleware");
const resetPasswordMiddleware = require("../../http/middlewares/reset.password.middleware");

var router = express.Router();

router.get(
  "/",
  teacherMiddleware,
  firstLoginMiddleware,
  teacherController.index
);
router.get(
  "/account",
  teacherMiddleware,
  firstLoginMiddleware,
  teacherController.account
);
router.post(
  "/account",
  teacherMiddleware,
  firstLoginMiddleware,
  teacherController.updateInfo
);
router.get(
  "/account/change-password",
  teacherMiddleware,
  firstLoginMiddleware,
  teacherController.changePassword
);
router.post(
  "/account/change-password",
  teacherMiddleware,
  firstLoginMiddleware,
  teacherController.handleChangePassword
);
router.get(
  "/account/reset-password",
  teacherMiddleware,
  resetPasswordMiddleware,
  teacherController.resetPassword
);
router.post(
  "/account/reset-password",
  teacherMiddleware,
  resetPasswordMiddleware,
  teacherController.handleResetPassword
);

module.exports = router;
