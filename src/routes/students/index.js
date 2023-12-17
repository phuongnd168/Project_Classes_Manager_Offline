var express = require("express");
var router = express.Router();
const studentController = require("../../http/controllers/students/home.controller");
const studentMiddleware = require("../../http/middlewares/student.middleware");
const firstLoginMiddleware = require("../../http/middlewares/first.login.middleware");
const resetPasswordMiddleware = require("../../http/middlewares/reset.password.middleware");

router.get(
  "/",
  studentMiddleware,
  firstLoginMiddleware,
  studentController.index
);
router.get(
  "/account",
  studentMiddleware,
  firstLoginMiddleware,
  studentController.account
);
router.post(
  "/account",
  studentMiddleware,
  firstLoginMiddleware,
  studentController.updateInfo
);
router.get(
  "/account/change-password",
  studentMiddleware,
  firstLoginMiddleware,
  studentController.changePassword
);
router.post(
  "/account/change-password",
  studentMiddleware,
  firstLoginMiddleware,
  studentController.handleChangePassword
);
router.get(
  "/account/reset-password",
  studentMiddleware,
  resetPasswordMiddleware,
  studentController.resetPassword
);
router.post(
  "/account/reset-password",
  studentMiddleware,
  resetPasswordMiddleware,
  studentController.handleResetPassword
);

module.exports = router;
