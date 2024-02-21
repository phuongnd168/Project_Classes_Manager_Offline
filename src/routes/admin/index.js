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
const teacherController = require("../../http/controllers/admin/teacher.controller");
const uploadFile = require("../../utils/uploadFile");
const addStudentMiddleware = require("../../http/middlewares/class/add.student.middleware");
const roleController = require("../../http/controllers/admin/role.controller");
const timetableMiddleware = require("../../http/middlewares/teacher/timetable.middleware");
const addRoleMiddleware = require("../../http/middlewares/role/add.role.middleware");
const editRoleMiddleware = require("../../http/middlewares/role/edit.role.middleware");
const handleEditRoleMiddleware = require("../../http/middlewares/role/handle.edit.role.middleware");
const roleMiddleware = require("../../http/middlewares/authorization/role.middleware");
const userMiddleware = require("../../http/middlewares/role/user.middleware");

const getUserMiddleware = require("../../http/middlewares/authorization/user/user.middleware");
const addUserInfoMiddleware = require("../../http/middlewares/authorization/user/add.user.middleware");
const editUserInfoMiddleware = require("../../http/middlewares/authorization/user/edit.user.middleware");
const destroyUserInfoMiddleware = require("../../http/middlewares/authorization/user/destroy.user.middleware");

const getStudentMiddleware = require("../../http/middlewares/authorization/student/student.middleware");
const addStudentInfoMiddleware = require("../../http/middlewares/authorization/student/add.student.middleware");
const editStudentInfoMiddleware = require("../../http/middlewares/authorization/student/edit.student.middleware");
const destroyStudentInfoMiddleware = require("../../http/middlewares/authorization/student/destroy.student.middleware");

const getTeacherMiddleware = require("../../http/middlewares/authorization/teacher/teacher.middleware");
const addTeacherInfoMiddleware = require("../../http/middlewares/authorization/teacher/add.teacher.middleware");
const editTeacherInfoMiddleware = require("../../http/middlewares/authorization/teacher/edit.teacher.middleware");
const destroyTeacherInfoMiddleware = require("../../http/middlewares/authorization/teacher/destroy.teacher.middleware");

const getCourseMiddleware = require("../../http/middlewares/authorization/course/course.middleware");
const addCourseInfoMiddleware = require("../../http/middlewares/authorization/course/add.course.middleware");
const editCourseInfoMiddleware = require("../../http/middlewares/authorization/course/edit.course.middleware");
const destroyCourseInfoMiddleware = require("../../http/middlewares/authorization/course/destroy.course.middleware");

const getClassMiddleware = require("../../http/middlewares/authorization/class/class.middleware");
const addClassInfoMiddleware = require("../../http/middlewares/authorization/class/add.class.middleware");
const editClassInfoMiddleware = require("../../http/middlewares/authorization/class/edit.class.middleware");
const destroyClassInfoMiddleware = require("../../http/middlewares/authorization/class/destroy.class.middleware");

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

router.get("/manager/users", getUserMiddleware, userController.index);
router.get("/manager/users/add", addUserInfoMiddleware, userController.addUser);
router.post(
  "/manager/users/add",
  addUserMiddleware(),
  userController.handleAddUser
);
router.get(
  "/manager/users/edit/:id",
  editUserInfoMiddleware,
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
  destroyUserInfoMiddleware,
  destroyUserMiddleware,
  userController.deleteUser
);
router.post(
  "/manager/users/deleteAll",
  destroyUserInfoMiddleware,
  userController.deleteAll
);
router.post(
  "/manager/users/import-excel",
  uploadFile,
  userController.importExcel
);
router.get(
  "/manager/users/export-excel",
  userController.exportExcel
);

router.get("/manager/students", getStudentMiddleware, studentController.index);
router.get("/manager/students/add", addStudentInfoMiddleware, studentController.addStudent);
router.post(
  "/manager/students/add",
  addUserMiddleware(),
  studentController.handleAddStudent
);
router.get(
  "/manager/students/edit/:id",
  editStudentInfoMiddleware,
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
  destroyStudentInfoMiddleware,
  destroyUserMiddleware,
  studentController.deleteStudent
);

router.post(
  "/manager/students/deleteAll",
  destroyStudentInfoMiddleware,
  studentController.deleteAll
);
router.post(
  "/manager/students/import-excel",
  uploadFile,
  studentController.importExcel
);
router.get(
  "/manager/students/export-excel",
  studentController.exportExcel
);


router.get("/manager/teachers", getTeacherMiddleware, teacherController.index);
router.get("/manager/teachers/add", addTeacherInfoMiddleware, teacherController.addTeacher);
router.post(
  "/manager/teachers/add",
  addUserMiddleware(),
  teacherController.handleAddTeacher
);
router.get(
  "/manager/teachers/edit/:id",
  editTeacherInfoMiddleware,
  editUserMiddleware,
  teacherController.editTeacher
);
router.post(
  "/manager/teachers/edit/:id",
  handleEditUserMiddleware(),
  teacherController.handleEditTeacher
);
router.post(
  "/manager/teachers/delete/:id",
  destroyTeacherInfoMiddleware,
  destroyUserMiddleware,
  teacherController.deleteTeacher
);
router.get(
  "/manager/teachers/timetable/:id",
  getTeacherMiddleware,
  timetableMiddleware,
  teacherController.timetable
);
router.post(
  "/manager/teachers/deleteAll",
  destroyTeacherInfoMiddleware,
  teacherController.deleteAll
);
router.post(
  "/manager/teachers/import-excel",
  uploadFile,
  teacherController.importExcel
);
router.get(
  "/manager/teachers/export-excel",
  teacherController.exportExcel
);

router.get("/manager/courses", getCourseMiddleware, courseController.index);
router.get("/manager/courses/add", addCourseInfoMiddleware, courseController.addCourse);
router.post(
  "/manager/courses/add",
  addCourseMiddleware(),
  courseController.handleAddCourse
);
router.get(
  "/manager/courses/edit/:id",
  editCourseInfoMiddleware,
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
  destroyCourseInfoMiddleware,
  destroyCourseMiddleware,
  courseController.deleteCourse
);
router.get(
  "/manager/courses/module/:id",
  getCourseMiddleware,
  editCourseMiddleware,
  courseController.module
);
router.post(
  "/manager/courses/deleteAll",
  destroyCourseInfoMiddleware,
  courseController.deleteAll
);
router.post(
  "/manager/courses/import-excel",
  uploadFile,
  courseController.importExcel
);
router.get(
  "/manager/courses/export-excel",
  courseController.exportExcel
);

router.get("/manager/classes", getClassMiddleware, classController.index);
router.get("/manager/classes/add", addClassInfoMiddleware, classController.addClass);
router.post(
  "/manager/classes/add",
  addClassMiddleware(),
  classController.handleAddClass
);
router.get(
  "/manager/classes/edit/:id",
  editClassInfoMiddleware,
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
router.get(
  "/manager/classes/students",
  classController.students
);
router.get(
  "/manager/classes/students/add/:id",
  addClassInfoMiddleware,
  classController.addStudent
);
router.post(
  "/manager/classes/students/add/:id",
  addStudentMiddleware(),
  classController.handleAddStudent
);
router.get(
  "/manager/classes/students/remove/:id",
  addClassInfoMiddleware,
  classController.removeStudent
);
router.post(
  "/manager/classes/students/remove/:id",
  
  classController.handleRemoveStudent
);
router.post(
  "/manager/classes/deleteAll",
  destroyClassInfoMiddleware,
  classController.deleteAll
);
router.post(
  "/manager/classes/import-excel",
  uploadFile,
  classController.importExcel
);
router.get(
  "/manager/classes/export-excel",
  classController.exportExcel
);


router.use(roleMiddleware)
router.get(
  "/manager/role",
  roleController.index
);
router.get(
  "/manager/role/add",
  roleController.addRole
);
router.post(
  "/manager/role/add",
  addRoleMiddleware(),
  roleController.handleAddRole
);
router.get(
  "/manager/role/edit/:id",
  editRoleMiddleware,
  roleController.editRole
);
router.post(
  "/manager/role/edit/:id",
  handleEditRoleMiddleware(),
  roleController.handleEditRole
);
router.get(
  "/manager/role/authorization",
  roleController.authorization
);
router.get(
  "/manager/role/authorization",
  roleController.authorization
);
router.get(
  "/manager/role/authorization/users",
  roleController.users
);

router.get(
  "/manager/role/authorization/users/:id",
  userMiddleware,
  roleController.addUserRole
);
router.post(
  "/manager/role/authorization/users/:id",
  roleController.handleAddUserRole
);

module.exports = router;
