var express = require("express");
const teacherController = require("../../http/controllers/teacher/home.controller")
const teacherMiddleware = require("../../http/middlewares/teacher.middleware");

var router = express.Router();

/* GET home page. */
router.get("/", teacherMiddleware, teacherController.index);
router.get("/account", teacherMiddleware, teacherController.account);
router.post("/account", teacherMiddleware, teacherController.updateInfo);
router.get("/account/change-password", teacherMiddleware, teacherController.changePassword);
router.post("/account/change-password", teacherMiddleware, teacherController.handleChangePassword);
module.exports = router;
