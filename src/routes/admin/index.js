var express = require("express");
var router = express.Router();
const DashboardController = require("../../http/controllers/admin/dashboard.controller");
const adminMiddleware = require("../../http/middlewares/admin.middleware");


router.get("/", adminMiddleware, DashboardController.index);
router.get("/account", adminMiddleware, DashboardController.account);
router.post("/account", adminMiddleware, DashboardController.updateInfo);
router.get("/account/change-password", adminMiddleware, DashboardController.changePassword);
router.post("/account/change-password", adminMiddleware, DashboardController.handleChangePassword);
module.exports = router;
