var express = require("express");
var router = express.Router();
const studentController = require("../../http/controllers/students/home.controller");
const studentMiddleware = require("../../http/middlewares/student.middleware");
const firstLoginMiddleware = require("../../http/middlewares/first.login.middleware");
const resetPasswordMiddleware = require("../../http/middlewares/reset.password.middleware");

router.use(studentMiddleware);
router.get(
  "/account/reset-password",
  resetPasswordMiddleware,
  studentController.resetPassword
);
router.post(
  "/account/reset-password",
  resetPasswordMiddleware,
  studentController.handleResetPassword
);
router.use(firstLoginMiddleware);
router.get("/", studentController.index);
router.get("/account", studentController.account);
router.post("/account", studentController.updateInfo);
router.get("/account/change-password", studentController.changePassword);
router.post("/account/change-password", studentController.handleChangePassword);

module.exports = router;
