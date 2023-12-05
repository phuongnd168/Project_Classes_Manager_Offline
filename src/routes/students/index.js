var express = require("express");
var router = express.Router();
const studentController = require("../../http/controllers/students/home.controller");
const studentMiddleware = require("../../http/middlewares/student.middleware");


/* GET home page. */
router.get("/", studentMiddleware, studentController.index);
router.get("/account", studentMiddleware, studentController.account);
router.post("/account", studentMiddleware, studentController.updateInfo);
router.get("/account/change-password", studentMiddleware, studentController.changePassword);
router.post("/account/change-password", studentMiddleware, studentController.handleChangePassword);
module.exports = router;
